import axios from '@/plugins/axios';
import type { AxiosResponse } from 'axios'

const prefix: string = '/agent'

export const getAllAgentsPaginate = (args: any): Promise<AxiosResponse> => {
	return axios.get(`${prefix}`, { params: args })
}

export const getAgent = (id: string): Promise<AxiosResponse> => {
	return axios.get(`${prefix}/${id}`)
}

export const createAgent = (data: Agent): Promise<AxiosResponse> => {
	return axios.post(`${prefix}`, data)
}

export const updateAgent = (data: Agent): Promise<AxiosResponse> => {
	return axios.put(`${prefix}/${data.id}`, data)
}

export const deleteAgent = (id: number): Promise<AxiosResponse> => {
	return axios.delete(`${prefix}/${id}`)
}
export default {
	getAllAgentsPaginate,
	getAgent,
	updateAgent,
	deleteAgent
}