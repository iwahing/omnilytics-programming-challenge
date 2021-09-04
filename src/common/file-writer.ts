import fs from 'fs';
import logger from '../utils/logger';
import parser from './parser';

const appendToFile = async (fileName: string, data: string): Promise<void> => {
  await fs.promises.appendFile(fileName, data, 'utf8');
};

const writeToFile = async (fileName: string, data: string): Promise<void> => {
  await fs.promises.writeFile(fileName, data, 'utf8');
};

const write = async (fileName: string, data: [(string | number)[]]): Promise<void> => {
  await appendToFile(fileName, '');
  await writeToFile(fileName, '');

  let stringifyData = '';
  data.forEach((item: (string | number)[]) => {
    stringifyData += parser.stringify(item);
  });

  await appendToFile(fileName, stringifyData);
};

export default { write };
