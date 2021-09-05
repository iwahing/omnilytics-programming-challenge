/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import logger from '../../utils/logger';
import common from '../../common';

const data: any = [];
const fileName: string = 'data.txt';

const generateData = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  logger.debug('Generating Data');

  const currentData: (string | number)[] = Array(4)
    .fill(0)
    .map(() => {
      const fixSize = parseInt(common.generator.generateCustom(1, '123456789'), 10);
      const dataType = parseInt(common.generator.generateCustom(1, '0123'), 10);

      if (dataType === 1) {
        return common.generator.generateAlpha(fixSize);
      }
      if (dataType === 2) {
        return common.generator.generateAlphanumeric(fixSize);
      }
      if (dataType === 3) {
        return common.generator.generateInteger(fixSize);
      }
      return common.generator.generateNumber(fixSize);
    });

  logger.debug(`Data Generated:\n\t\t\t[${currentData}]`);
  data.push(currentData);

  const reponseData = {
    data,
    link: fileName,
  };

  return res.status(200).json({
    message: 'Successfully generated',
    data: reponseData,
  });
};

const reportData = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const report = {
    number_of_alpha: 0,
    number_of_numbers: 0,
    number_of_integers: 0,
    number_of_alphanumeric: 0,
  };

  data.forEach((item: any[]) => {
    item.forEach((element) => {
      if (common.utils.isAlpha(element)) {
        report.number_of_alpha += 1;
      } else if (common.utils.isFloat(element)) {
        report.number_of_numbers += 1;
      } else if (common.utils.isInteger(element)) {
        report.number_of_integers += 1;
      } else if (common.utils.isAlphaNumeric(element)) {
        report.number_of_alphanumeric += 1;
      }
    });
  });

  logger.debug(`Generated Report:\n${JSON.stringify(report)}`);

  return res.status(200).json({
    message: 'Create Report Successful',
    data: report,
  });
};

const downloadData = async (req: Request, res: Response): Promise<void | Response<any, Record<string, any>>> => {
  if (req.params.filename !== fileName) {
    return res.status(400).json({
      message: `${req.params.filename} does not exist`,
    });
  }

  try {
    await common.fileWriter.write(fileName, data);

    return res.download(fileName, (err) => {
      if (err) {
        throw new Error(`Error while exporting ${fileName}: ${err.message}`);
      }
    });
  } catch (err: any) {
    logger.info(`Error while exporting ${fileName}: ${err.message}`);
    return res.status(500).json({
      message: err.message,
    });
  }
};

export default { generateData, reportData, downloadData };
