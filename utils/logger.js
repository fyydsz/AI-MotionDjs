const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { combine, timestamp, json, errors } = winston.format;

const errorTransport = new DailyRotateFile({
  filename: './logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxSize: '20m',
  maxFiles: '14d', // Keep logs for 14 days (optional)
  format: combine(errors({ stack: true }), timestamp(), json())
});

const logger = winston.createLogger({
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [errorTransport],
});

module.exports = logger;
