import axios from '@/plugins/axios';
import type { AxiosResponse } from 'axios'

const prefix: string = '/role'

export const getAllScopeCategories = (): Promise<AxiosResponse> => {
    return axios.get(`/scope`)
}

export const getAllRolesPaginate = (args: any): Promise<AxiosResponse> => {
    return axios.get(`${prefix}`, { params: args })
}

export const getRole = (id: string): Promise<AxiosResponse> => {
    return axios.get(`${prefix}/${id}`)
}

export const createRole = (data: Role): Promise<AxiosResponse> => {
    return axios.post(`${prefix}`, data)
}

export const updateRole = (data: Role): Promise<AxiosResponse> => {
    return axios.put(`${prefix}/${data.id}`, data)
}

export const deleteRole = (id: string): Promise<AxiosResponse> => {
    return axios.delete(`${prefix}/${id}`)
}
export default {
    getAllRolesPaginate,
    getAllScopeCategories,
    getRole,
    createRole,
    updateRole,
    deleteRole
}