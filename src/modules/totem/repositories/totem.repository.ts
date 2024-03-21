import axios from '@/plugins/axios';

export function getTotem() {
  return axios.get(`/totem`);
}

export function findTotem(id: number) {
  return axios.get(`/totem/${id}`);
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

export function updateQueueTotem(id: number, props: any) {
  return axios.post(`/totem/${id}/queue`, props);
}

export function deleteQueueTotem(id: number, queueId: string | number) {
  return axios.delete(`/totem/${id}/queue/${queueId}`);
};

export function attachScreens(id: number, screens: ScreenTotem[]) {
  return axios.post(`/totem/${id}/screen`, {
    screens
  });
}

export function deleteScreenTotem(screen: ScreenTotem) {
  return axios.delete(`/totem/${screen.totem_id}/screen/${screen.screen_id}`);
}

