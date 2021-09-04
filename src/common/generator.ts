import generator from 'randomstring';

const generateAlpha = (length: number): string => {
  return generator.generate({ length: length, charset: 'alphabetic' });
};
const generateNumber = (length: number): number => {
  return parseFloat(generateInteger(length) + '.' + generateInteger(length));
};
const generateInteger = (length: number): number => {
  return parseInt(generator.generate({ length: length, charset: 'numeric' }));
};
const generateAlphanumeric = (length: number): string => {
  return generator.generate({ length: length, charset: 'alphanumeric' });
};

const generateCustom = (length: number, charset: string): string => {
  return generator.generate({ length: length, charset: charset });
};

export default {
  generateAlpha,
  generateNumber,
  generateInteger,
  generateAlphanumeric,
  generateCustom,
};
