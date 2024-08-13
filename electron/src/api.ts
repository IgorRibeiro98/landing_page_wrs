import { BrowserWindow } from "electron";
import { Setting } from "./setting";

export default class API {
    get exceptMethods() {
        return ['constructor', 'getMethods', 'delay'] as const;
    }

    private get methods() {
        return Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter((name: any) => !this.exceptMethods.includes(name)) as (keyof API)[]
    }

    print(payload: {value: string, site: string}, {settings, developmentServer}: {settings: Setting, developmentServer: boolean}) {
        return new Promise((response, reject) => {
            const window = new BrowserWindow({
                frame: false,
                width: 300,
                height: 400,
                modal: true,
                show: false,
            })
            
            const queryString = new URLSearchParams(payload).toString()
    
            const url = `${settings.get('appURL')}/senha?${queryString}`

            window.loadURL(url)

            setTimeout(() => reject({ message: 'Timeout para imprimir' }), 6000)
            window.once('ready-to-show', () => {
                if (developmentServer) {
                    window.show()
                    setTimeout(() => window.destroy(), 3000)
                    return response(true)
                }

                setTimeout(() => {
                    window.webContents.print({
                        silent: true,
                        deviceName: 'Senha'
                    }, (success: boolean, message: string): void => {
                        window.destroy()

                        if (success) return response(true)

                        return reject(JSON.stringify({ message }))
                    })
                }, 2500)
            })
        })
    }

    hello() {
        return 'world'
    }
    
    register(callback: CallableFunction) {
        this.methods.forEach((key) => {
            const method: any = this[key]

            if (method instanceof Function) callback(key, method)
        })
    }
}