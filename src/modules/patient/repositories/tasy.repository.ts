
import { agent } from '@/plugins/axios';

export function getSex() {
    return agent.get('tasy/sex')
}

export function getMeritalStatus() {
    return agent.get('tasy/merital-status')
}

export function getReligion() {
    return agent.get('tasy/religion')
}

export function getNationality() {
    return agent.get('tasy/nationality')
}

export function getUf() {
    return agent.get('tasy/uf')
}

export function getTypeOfAddress() {
    return agent.get('tasy/type-address')
}

export function findAddressByCep(cep: string) {
    return agent.get(`https://viacep.com.br/ws/${cep}/json/`)
}

export function getSites() {
    return agent.get('tasy/site')
}

export function getDepartments(params = {}) {
    return agent.get('tasy/department', {
        params
    })
}

export function getQueues() {
    return agent.get('tasy/queue')
}