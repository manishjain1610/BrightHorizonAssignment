import { createLogger, format, transports } from 'winston';

const Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'HH-MM:ss YYYY-MM-DD',
    }),
    format.prettyPrint(),
    format.align(),
    format.printf(info => {
      return `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message}`;
    })
  ),
  transports: [
    new transports.File({ filename: 'logs/BrightHorizonTestScenario.log' }),
    new transports.Console(),
  ],
});

export default Logger;
