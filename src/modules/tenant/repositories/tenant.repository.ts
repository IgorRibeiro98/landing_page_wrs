import axios from '@/plugins/axios';

export function getTenant() {
    return axios.get(`/tenant/my`);
}

export function createTenant(tenant: FormData) {
    return axios.post(`/tenant`, tenant);
}

export function validateDomain(domain: string) {
    return axios.get(`/tenant/validate-domain/`, {
        params: {
            domain
        }
    });
}
