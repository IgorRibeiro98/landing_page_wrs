import { app, protocol, BrowserWindow, ipcMain } from 'electron'

import { contentType } from 'mime-types'

import { join, extname } from 'path'
import { readFile } from 'fs';

import API from './src/api';
import { Setting } from './src/setting';

const api = new API()

export interface InjectParams {
    mainWindow: BrowserWindow
    developmentServer: boolean
}

export class Main {
    mainWindow: BrowserWindow
    developmentServer: boolean = process.env.npm_lifecycle_event == 'serve' ? true : false

    constructor() {
        protocol.registerSchemesAsPrivileged([
            {
                scheme: 'app',
                privileges: {
                    secure: true,
                    standard: true,
                },
            },
        ]);
    }

    onReady(callback: CallableFunction) {
        const path: string = this.developmentServer ? process.cwd() : app.getPath('exe').replace(/[^\\]*.exe$/, '')

        const settings = new Setting({
            name: 'setting.json',
            path,
            default: {
                openDevTools: false,
                fullscreen: true,
                autoHideMenuBar: true,
                development: {
                    shouldPrint: true,
                },
                printer: {
                    password: 'Senha'
                },
                appURL: 'http://localhost:3000/#'
            }
        })

        app.disableHardwareAcceleration();

        const injectedParams = {
            settings,
            developmentServer: this.developmentServer,
        }

        api.register((key: string, method: Function) => {
            ipcMain.handle(key, (_: any, payload: any) => method(payload, injectedParams))
        })

        app.on('ready', (): void => {
            try {
                this.createProtocol('app')
                this.createFileProtocol('storage')

                this.mainWindow = new BrowserWindow({
                    fullscreen: settings.get('fullscreen'),
                    autoHideMenuBar: settings.get('autoHideMenuBar'),
                    webPreferences: {
                        nodeIntegration: false,
                        contextIsolation: true,
                        sandbox: false,
                        preload: join(__dirname, 'src', 'preload.js'),
                    },
                    title: 'Totem',
                })

                // const url = this.developmentServer ? 'http://localhost:3000' : `app://index.html/#/`
                const url = settings.get('appURL')

                this.loadURLWithRetry(this.mainWindow, url);

                this.mainWindow.on('close', () => {
                    app.quit()
                })

                this.mainWindow.webContents.on('did-finish-load', () => {
                    if (settings.get('openDevTools')) this.mainWindow.webContents.openDevTools({ mode: 'detach' })
                })

                callback(this)
            } catch (exception) {
                console.error(exception)
            }
        })

        app.on('will-quit', () => app.quit())
    }

    loadURLWithRetry(window: BrowserWindow, url: string, retries = 5) {
        window.loadURL(url)
            .catch((err: any) => {
                console.error(`Falha ao carregar a URL: ${url}`, err);
                if (retries > 0) {
                    console.log(`Tentando em 5 seconds... (${retries} tentativas restantes)`);
                    setTimeout(() => this.loadURLWithRetry(window, url, retries - 1), 5000);
                } else {
                    console.error(`Falha ao carregar a URL depois de ${retries} tentativas`);
                }
            });
    }

    handler(name: string, callback: CallableFunction) {
        const injectParams: InjectParams = {
            mainWindow: this.mainWindow,
            developmentServer: true
        }

        ipcMain.handle(name, (event: any, payload: any) => callback(payload, injectParams))
    }

    createProtocol(scheme: string) {
        return protocol.registerBufferProtocol(
            scheme, (request: any, callback: CallableFunction): void => {
                let pathName: string = new URL(request.url).pathname

                pathName = decodeURI(pathName)

                if (pathName == '/') pathName = '/index.html'

                const filePath: string = join(__dirname, pathName)

                readFile(filePath, (error, data): void => {
                    if (error) console.error(`Falha ao encontrar o arquivo ${filePath} no protocolo ${scheme}`, error)

                    const extension: string = extname(pathName)

                    const cType = contentType(extension)

                    if (!cType) return

                    const [mimeType] = cType.split(';')

                    callback({ mimeType, data })
                })
            })
    }

    createFileProtocol(scheme: string) {
        return protocol.registerFileProtocol(
            scheme, (request: any, callback: CallableFunction): void => {
                const regex = new RegExp(`^${scheme}:\/\/|\/$`, 'g');

                const filePath = request.url.replace(regex, '')

                const file = join(process.cwd(), filePath)

                console.log({
                    filePath,
                    file,
                })

                return callback(file)
            })
    }

    checkDevelopmentServer() {
        if (this.developmentServer)
            require('electron-reload')(join(__dirname, '..'), {
                electron: `${__dirname}/../node_modules/.bin/electron`,
                forceHardReset: true,
                hardResetMethod: 'exit',
            })
    }
}
