const pino = require("pino");

const logger = pino({
  level: 'info',
});

const errorMiddleware = (error, req, res, next) => {
  logger.error(error);
  return res.status(500).send({
    success: false,
    message: error.message
  });
};

module.exports = {
  logger,
  errorMiddleware
};