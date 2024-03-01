import axios from '@/plugins/axios';
import { AxiosResponse } from 'axios';

export function getQueues() {
    return axios.get(`/queue`);
}

export function findQueue(id: number): Promise<AxiosResponse<Queue>> {
    return axios.get(`/queue/${id}`);
}

export function createQueue(queue: FormData) {
    return axios.post(`/queue`, queue);
}

export function updateQueue(id: number, queue: FormData) {
    queue.append('_method', 'PUT')
    
    return axios.post(`/queue/${id}`, queue);
}