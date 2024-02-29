export const required = (value: any): boolean | string => !!value || 'Este campo é obrigatório';

export const requiredArray = (value: any[]): boolean | string => Array.isArray(value) && value.length > 0 || 'Este campo é obrigatório';

export const minLength = (min: number) => (value: string | any[]): boolean | string => {
    return value.length >= min || `O campo deve ter pelo menos ${min} ${typeof value === 'string' ? 'caracteres' : 'itens'}`;
}

export const maxLength = (max: number) => (value: string | any[]): boolean | string => {
    return value.length <= max || `O campo deve ter no máximo ${max} ${typeof value === 'string' ? 'caracteres' : 'itens'}`;
}

export const email = (value: string): boolean | string =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) || 'O campo deve ser um e-mail válido';

export const numeric = (value: string): boolean | string =>
    /^[0-9]+$/.test(value) || 'O campo deve ser numérico';

export const between = (min: number, max: number) => (value: number): boolean | string => {
    return value >= min && value <= max || `O campo deve ter entre ${min} e ${max} caracteres`;
}

export const equals = (value: string|number) => (value2: string|number) => {
    return value === value2 || 'Os campos devem ser iguais';
}

export default {
    required,
    requiredArray,
    minLength,
    maxLength,
    email,
    numeric,
    between,
    equals
}