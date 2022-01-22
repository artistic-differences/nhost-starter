// import the winston library
const winston = require('winston');
require('winston-daily-rotate-file');
const { parsedSessionVariables } = require('./session')

const { Logtail } = require("@logtail/node");
const { LogtailTransport } = require("@logtail/winston");

const logtail = new Logtail("ziPVo2ykGyQSD29oxaq5hr82");

async function enrichLogs(log) {

  const session = parsedSessionVariables();

  return {
    ...log,
    session: session
  };
}
logtail.use(enrichLogs);


// filter function,
// that will allow logging only the specified log level
const filter = (level) => winston.format((info) => {
  if (info.level === level) {
    return info;
  }
})();

// log levels system
const levels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  http: 5,
};

const dailyRotateTransport = new winston.transports.DailyRotateFile({
  filename: './logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d', //keep logs for 14 days
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  )
});

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.json(),
)

//monitor all logs and send them to console, file and logtail
//might want to reduce log tail to errors in production
const transports = [
  dailyRotateTransport,
  new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      )
  }),
  new LogtailTransport(logtail),
];

// create a Winston logger
const logger = winston.createLogger({
  // specify the log format
  format: logFormat,
  // specify the own log levels system
  levels,
  // specify the logging targets
  transports
});

// export the logger
module.exports = logger

