import axios from '@/plugins/axios';

export function getTenant() {
    return axios.get(`/tenant/my`);
}
