import app from './app';
import logger from './utils/logger';
import config from './utils/config';

logger.info('Starting...');
app.listen(config.PORT, () => {
  logger.info(`Listening to ${config.PORT}`);
});
