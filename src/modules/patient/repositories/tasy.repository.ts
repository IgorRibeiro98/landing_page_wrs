
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