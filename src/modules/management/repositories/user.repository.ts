import axios from '@/plugins/axios';
import type { AxiosResponse } from 'axios'

const prefix: string = '/user'

export function getAllUsersPaginate(args: any): Promise<AxiosResponse> {
    return axios.get(`${prefix}`, { params: args })
}

export function createUser(data: User): Promise<AxiosResponse> {
    return axios.post(`${prefix}`, {
        ...data,
        tenant_ids: data.tenants
    })
}

export function updateUser(data: any): Promise<AxiosResponse> {
    console.log(data.tenants)
    return axios.put(`${prefix}/${data.id}`, {
        ...data,
        tenant_ids: data.tenants.map((tenant: Tenant) => tenant.id ?? tenant)
    })
}

export function deleteUser(id: number): Promise<AxiosResponse> {
    return axios.delete(`${prefix}/${id}`)
}

export function resetUserPassword(user: User, newPassword: string): Promise<AxiosResponse> {
    return axios.put(`${prefix}/${user.id}/reset-password`, {
      password: newPassword
    })
}

export default {
    getAllUsersPaginate,
    createUser,
    updateUser,
    deleteUser,
    resetUserPassword,
}
