export const capitalize = (str: string): string => {
  return str.split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatDate = (date: Date, format: string = 'dd/mm/yyyy'): string => {
  const map: { [key: string]: string } = {
    'dd': (date.getDate()).toString().padStart(2, '0'),
    'mm': (date.getMonth() + 1).toString().padStart(2, '0'), // meses começam do 0 em JavaScript
    'yyyy': date.getFullYear().toString()
  };

  return format.replace(/dd|mm|yyyy/gi, matched => map[matched]);
}

export const downloadText = (fileName: string, text: string) => {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', fileName);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
