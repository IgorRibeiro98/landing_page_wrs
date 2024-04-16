import { BrowserWindow } from "electron";

export default class API {
    get exceptMethods() {
        return ['constructor', 'getMethods', 'delay'] as const;
    }

    private get methods() {
        return Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter((name: any) => !this.exceptMethods.includes(name)) as (keyof Routes)[]
    }

    print(payload: {value: string, site: string}) {
        const window = new BrowserWindow({
            frame: false,
            width: 300,
            height: 400,
            modal: true,
            show: false,
        })

        const queryString = new URLSearchParams(payload).toString()

        const url = `http://leve.test:3000/#/senha?${queryString}`

        window.loadURL(url)

        return new Promise((response, reject) => {
            window.once('ready-to-show', () => {
                // Métodos serão necessarios para habilitar somente no ambiente de teste
                // window.show()
                // setTimeout(() => window.destroy(), 2500)
                // return response(true)

                setTimeout(() => {
                    setTimeout(() => reject({ message: 'Timeout para imprimir' }), 4000)

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
    
    register(callback: CallableFunction) {
        this.methods.forEach((key) => {
            const method: any = this[key]

            if (method instanceof Function) callback(key, method)
        })
    }
}