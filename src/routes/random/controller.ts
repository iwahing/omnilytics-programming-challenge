import { Request, Response } from 'express';
import logger from '../../utils/logger';
import commmon from '../../common';
import common from '../../common';
import fs from 'fs';

const data: any = [];
const fileName: string = 'data.txt';

const generateData = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  logger.debug('Generating Data');

  const currentData: (string | number)[] = Array(4)
    .fill(0)
    .map((_) => {
      const fixSize = parseInt(commmon.generator.generateCustom(1, '123456789'));
      const dataType = parseInt(commmon.generator.generateCustom(1, '0123'));

      if (dataType === 1) {
        return commmon.generator.generateAlpha(fixSize);
      } else if (dataType === 2) {
        return commmon.generator.generateAlphanumeric(fixSize);
      } else if (dataType === 3) {
        return commmon.generator.generateInteger(fixSize);
      } else {
        return commmon.generator.generateNumber(fixSize);
      }
    });

  logger.debug(`Data Generated:\n\t\t\t[${currentData}]`);
  data.push(currentData);

  const reponseData = {
    data: data,
    link: fileName,
  };

  return res.status(200).json({
    message: 'Successfully generated',
    data: reponseData,
  });
};

const reportData = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const report = {
    number_of_alpha: 0,
    number_of_numbers: 0,
    number_of_integers: 0,
    number_of_alphanumeric: 0,
  };

  data.forEach((item: any[]) => {
    item.forEach((element) => {
      if (commmon.utils.isAlpha(element)) {
        ++report.number_of_alpha;
      } else if (commmon.utils.isFloat(element)) {
        ++report.number_of_numbers;
      } else if (commmon.utils.isInteger(element)) {
        ++report.number_of_integers;
      } else if (commmon.utils.isAlphaNumeric(element)) {
        ++report.number_of_alphanumeric;
      }
    });
  });

  logger.debug(`Generated Report:\n${JSON.stringify(report)}`);

  return res.status(200).json({
    message: 'Create Report Successful',
    data: report,
  });
};

const downloadData = async (
  req: Request,
  res: Response,
): Promise<void | Response<any, Record<string, any>>> => {
  if (req.params.filename !== fileName) {
    return res.status(400).json({
      message: `${req.params.filename} does not exist`,
    });
  }

  try {
    await common.fileWriter.write(fileName, data);

    return res.download(fileName, (err) => {
      if (err) {
        logger.debug(`Error while exporting ${fileName}: ${err.message}`);
        return res.status(500).json({
          message: err.message,
        });
      }
    });
  } catch (err: any) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export default { generateData, reportData, downloadData };
