export function required(value: any) {
    value = Array.isArray(value) ? value.length ? true : false : !!value;

    return value || 'Campo obrigatório'
}


export function email(value: string): boolean | string {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(value) || 'Endereço de email deve ser válido';
}