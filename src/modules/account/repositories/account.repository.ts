import axios from '@/plugins/axios';

export function getAccount() {
    return axios.get(`/account/my`);
}
