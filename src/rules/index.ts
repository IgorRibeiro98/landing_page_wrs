export function required(value: any) {
    value = Array.isArray(value) ? value.length ? true : false : !!value;

    return value || 'Campo obrigatório'
}

export function requiredArray(value: any[]): boolean | string {
    return Array.isArray(value) && value.length > 0 || 'Este campo é obrigatório'
}


export function email(value: string): boolean | string {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(value) || 'Endereço de email deve ser válido';
}

export function cpf(value: string): boolean | string {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    return cpfRegex.test(value) || 'CPF deve ser válido';
}