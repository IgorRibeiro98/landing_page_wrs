import { readFileSync, writeFileSync } from "fs"
import path from 'path'

interface Option {
    name: string,
    path: string,
    default?: {
        [key: string]: any
    }
}

export class Setting {
    public data: any

    constructor(private option: Option) {
        const data = this.getJsonFromFile()

        this.data = { ...option.default, ...data }

        this.save()
    }

    private getJsonFromFile() {
        const settings = this.getFile()

        if (!settings) return {}

        try {
            return JSON.parse(settings)
        } catch (error) {
            console.log(`Falha ao parsear JSON do arquivo ${this.option.path}`)
            return {}
        }
    }

    private getFile() {
        const filePath = this.getFilePath()

        try {
            const settings = readFileSync(filePath, 'utf8')

            if (!settings.length) return null

            return settings
        } catch (error) {
            console.log(`Falha ao buscar o arquivo em ${filePath}`)
            return null
        }
    }

    public save() {
        try {
            writeFileSync(this.getFilePath(), JSON.stringify(this.data), 'utf8')
        } catch (error) {
            console.log(`Falha ao escrever em arquivo ${error}`)
        }
    }

    private getFilePath() {
        return path.join(this.option.path, this.option.name)
    }

    public get(key: string) {
        return this.data[key] ?? null
    }

    set(key: string, value: any) {
        this.data[key] = value
        this.save()
    }

    overwrite(d: any) {
        this.data = {...d}
        this.save()
    }
}