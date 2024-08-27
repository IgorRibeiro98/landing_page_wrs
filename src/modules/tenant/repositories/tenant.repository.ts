import axios from '@/plugins/axios';

export function paginateTenants(params = {}) {
  return axios.get(`/tenant`, {
    params
  });
}

export function getTenant() {
    return axios.get(`/tenant/my`);
}

export function createTenant(tenant: FormData) {
    return axios.post(`/tenant`, tenant);
}

export function deleteTenant(tenant: Tenant) {
    return axios.delete(`/tenant/${tenant.id}`);
}

export function validateSubdomain(subdomain: string) {
    return axios.get(`/tenant/validate-subdomain/`, {
        params: {
            subdomain
        }
    });
}
