import axios from '@/plugins/axios';

const prefix = 'screen';

export function getScreens() {
    return axios.get(`/${prefix}`);
}

export function findScreen(id: number) {
  return axios.get(`/${prefix}/${id}`);
}

export function createScreen(totem: TotemItem) {
    return axios.post(`/${prefix}`, totem);
}

export function updateScreen(id: number, totem: TotemItem) {
  return axios.put(`/${prefix}/${id}`, totem);
}

export function deleteScreen(id: number) {
  return axios.delete(`/${prefix}/${id}`);
}

