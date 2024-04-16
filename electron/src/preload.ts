import { contextBridge, ipcRenderer } from "electron";
import API from "./api";

const api = new API()

const exposeMethodsInMainWorld: any = {
}

api.register((key: string): void => {
    exposeMethodsInMainWorld[key] = (params:any) => ipcRenderer.invoke(key, params)
})

contextBridge.exposeInMainWorld('api', exposeMethodsInMainWorld)