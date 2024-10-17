import * as process from 'node:process';

export const configuration = () => ({
  logger: {
    level: 'debug',
    payloadSizeThreshold: 10000,
  },
});
