import axios from '@/plugins/axios';
import type { AxiosResponse } from 'axios'

const prefix: string = '/status'

export const getAllStatusPaginate = (args: any): Promise<AxiosResponse> => {
	return axios.get(`${prefix}`, { params: args })
}

export default {
	getAllStatusPaginate,
}