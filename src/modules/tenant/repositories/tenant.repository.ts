import axios from '@/plugins/axios';

export function getTenant() {
    return new Promise(res => {
        res({
            data: {
                "id": 1,
                "name": "Leve Sa\u00fade",
                "logo": "https://saludti.s3.us-east-2.amazonaws.com/leve.svg",
                "theme": "{\n    \"colors\": {\n        \"background\": \"#F3F3F3\",\n        \"surface\": \"#FFFFFF\",\n        \"surface-bright\": \"#FFFFFF\",\n        \"surface-light\": \"#EEEEEE\",\n        \"surface-variant\": \"#424242\",\n        \"on-surface-variant\": \"#EEEEEE\",\n  \"scrollbar\": \"#f04e23\",\n       \"primary\": \"#f04e23\",\n        \"primary-darken-1\": \"#1F5592\",\n        \"secondary\": \"#451e44\",\n        \"secondary-darken-1\": \"#018786\",\n        \"error\": \"#B00020\",\n        \"info\": \"#2196F3\",\n        \"success\": \"#4CAF50\",\n        \"warning\": \"#FB8C00\",\n        \"grey\": \"#abacac\",\n        \"keyboard\": \"#f94c07\"\n    }\n}",
                "provider_uri": "http:\/\/localhost:8006",
                "database_config_id": null,
                "created_at": "2024-04-10T20:34:33.000000Z",
                "updated_at": "2024-04-10T20:34:33.000000Z"
            }
        })
    })
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
