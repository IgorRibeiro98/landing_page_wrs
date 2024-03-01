import axios from '@/plugins/axios';

export function getTotem() {
    return axios.get(`/totem`);
}

export function createTotem(totem: TotemItem) {
    return axios.post(`/totem`, totem);
}

export function updateTotem(id: number, totem: TotemItem) {
  return axios.put(`/totem/${id}`, totem);
}

export function deleteTotem(id: number) {
  return axios.delete(`/totem/${id}`);
}

