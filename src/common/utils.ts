const isAlpha = (str: string): boolean => /^[a-zA-Z]*$/.test(str);

const isAlphaNumeric = (str: string): boolean => /^[a-zA-Z0-9]*$/.test(str);

const isInteger = (str: string): boolean => /^[0-9]*$/.test(str);

const isFloat = (str: string): boolean => /^[[0-9]+.[[0-9]]*]*$/.test(str);

export default { isAlpha, isAlphaNumeric, isInteger, isFloat };
