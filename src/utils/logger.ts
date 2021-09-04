import { addColors, createLogger, format, transports } from 'winston';
import config from './config';

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

addColors(colors);

const date = new Date();
const fileName = `logs/\
[${date.getFullYear()}-${date.getMonth()}-${date.getDay()}]\
 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} \
 mongodb`;

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  format.colorize({ all: true }),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const transport = [
  new transports.Console(),
  new transports.File({
    filename: `${fileName}-error.log`,
    level: 'error',
  }),
  new transports.File({ filename: `${fileName}.log` }),
  new transports.Http({
    format: format.json(),
  }),
];

const level = () => (config.NODE_ENV === 'DEVELOPMENT' ? 'debug' : 'info');

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const logger = createLogger({
  level: level(),
  levels,
  format: logFormat,
  transports: transport,
});

export default logger;
