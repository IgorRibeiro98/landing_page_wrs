import axios from '@/plugins/axios';

export function getTotem() {
    return axios.get(`/totem`);
}

export function createTotem(totem: TotemItem) {
    return axios.post(`/totem`, totem);
}
