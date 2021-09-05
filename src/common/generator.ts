import generator from 'randomstring';

const generateAlpha = (length: number): string => generator.generate({ length, charset: 'alphabetic' });
const generateAlphanumeric = (length: number): string => generator.generate({ length, charset: 'alphanumeric' });
const generateInteger = (length: number): number => parseInt(generator.generate({ length, charset: 'numeric' }), 10);
const generateNumber = (length: number): number => parseFloat(`${generateInteger(length)}.${generateInteger(length)}`);
const generateCustom = (length: number, charset: string): string => generator.generate({ length, charset });

export default {
  generateAlpha,
  generateNumber,
  generateInteger,
  generateAlphanumeric,
  generateCustom,
};
