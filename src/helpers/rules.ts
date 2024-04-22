type VarType = 'string' | 'number' | 'array';

export const required = (value: any): boolean | string => {
  return (value !== null && value !== undefined && value !== '') || 'Este campo é obrigatório';
}

export const requiredArray = (value: any[]): boolean | string => Array.isArray(value) && value.length > 0 || 'Este campo é obrigatório';

export const min = (min: number) => (value: string | any[]): boolean | string => {
  const type = getType(value);
  min = Number(min) //necessary because max can be a string when using in validator

  const msgMap: any = {
    number: `O campo deve ser maior que ${min}`,
    string: `O campo deve ter no minímo ${min} caracteres`,
    array: `O campo deve ter no minímo ${min} itens`
  }

  const msg = msgMap[type];
  const count = getCount(value, type);

  return count >= min || msg;
}

export const max = (max: number) => (value: string | any[] | number): boolean | string => {
  const type = getType(value);
  max = Number(max) //necessary because max can be a string when using in validator

  const msgMap: any = {
    number: `O campo deve ser menor que ${max}`,
    string: `O campo deve ter no máximo ${max} caracteres`,
    array: `O campo deve ter no máximo ${max} itens`
  }
  const msg = msgMap[type];
  const count = getCount(value, type);

  return count <= max || msg;
}

export const email = (value: string): boolean | string =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) || 'O campo deve ser um e-mail válido';

export const url = (value: string): boolean | string =>
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i.test(value) || 'O campo deve ser uma URL válida';

export const numeric = (value: string): boolean | string =>
  /^[0-9]+$/.test(value) || 'O campo deve ser numérico';

export const between = (min: number, max: number) => (value: number): boolean | string => {
  const type = getType(value);
  min = Number(min) //necessary because max can be a string when using in validator
  max = Number(max) //necessary because max can be a string when using in validator

  const msgMap: any = {
    number: `O campo deve ter o valor maior que ${min} e menor que ${max}`,
    string: `O campo deve ter entre ${min} e ${max} caracteres`,
    array: `O campo deve ter entre ${min} e ${max} itens`
  }

  const msg = msgMap[type];
  const count = getCount(value, type);

  return count >= min && count <= max || msg;
}

export const equals = (value: string | number) => (value2: string | number) => {
  return value === value2 || 'Os campos devem ser iguais';
}

function getType(value: any): VarType {
  if (!isNaN(value as any)) return 'number';
  if (Array.isArray(value)) return 'array';
  return 'string'
}

function getCount(value: any, type: VarType | undefined) {
  if (!type) type = getType(value);

  return type === 'number' ? value : value.length;
}

export default {
  required,
  requiredArray,
  min,
  max,
  email,
  numeric,
  between,
  equals,
  url
}
