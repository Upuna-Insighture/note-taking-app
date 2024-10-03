import logger from '../config/logger.js';

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: err.message });
};

export default errorHandler;
