import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const preserveColorUppercase = (colorizedText: string): string => {
  // Extract the ANSI color codes (everything before the text)
  const colorCodeMatch = colorizedText.match(/^\x1B\[[0-9;]*m/);

  // Get the color codes or default to an empty string
  const colorCode = colorCodeMatch ? colorCodeMatch[0] : '';

  // Remove color codes and convert the text to uppercase
  const plainText = colorizedText.replace(/\x1B\[[0-9;]*m/g, '').toUpperCase();

  // Reapply the color code to the uppercased text
  return `${colorCode}${plainText}`;
};

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  const symbols: { [key: string]: string } = {
    debug: '🔍', // Debug symbol
    info: '📃', // Info symbol
    warn: '⚠️', // Warning symbol
    error: '❌', // Error symbol
  };
  // De-colorize the level by removing ANSI escape codes. This is necessary to be able to correctly print symbols.
  const decolorizedLevel = level.replace(/\x1B\[[0-9;]*m/g, '').toLowerCase();
  const symbol = symbols[decolorizedLevel]?.trim() || '❓';

  // Convert level to uppercase while preserving color
  const upperCaseLevel = preserveColorUppercase(level);

  return `${timestamp}  ${symbol}  [${upperCaseLevel}]: ${message}`;
});

// Create logger instance
const Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'HH-MM:ss YYYY-MM-DD' }),
    winston.format.align(),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug', // Debug logs in console
      format: winston.format.combine(
        winston.format.colorize(), // Colors for console only
        logFormat
      ),
    }),
    // Daily rotating file transport
    new DailyRotateFile({
      level: 'info', // Info and higher logs in file
      filename: 'logs/BrightHorizon-%DATE%.log', // File name pattern
      datePattern: 'YYYY-MM-DD', // Rotate daily
      zippedArchive: true, // Compress old logs
      maxSize: '20m', // Max file size before rotating
      maxFiles: '7d', // Keep logs for 7 days
      auditFile: '.temp-audit.json', // Hide audit.json
      format: winston.format.combine(
        winston.format.uncolorize(), // No color in file logs
        logFormat
      ),
    }),
  ],
});

// Add custom colors for log levels
winston.addColors({
  debug: 'cyan',
  info: 'green',
  warn: 'yellow',
  error: 'red',
});

// Export the logger
export default Logger;
