import { get, set } from 'lodash/fp';
import { TransformableInfo, TransformFunction } from 'logform';
import { LeveledLogMethod, LogMethod } from 'winston';

const limitFieldValuesSize = (
  logObj: TransformableInfo,
  payloadSizeThreshold: number,
) => {
  const limitSize = (logObj: any) =>
    ['body', 'payload', 'request', 'message'].reduce(
      (accumulateObj, objKey) =>
        !get(objKey, logObj)
          ? accumulateObj
          : set(
              objKey,
              get(objKey, logObj).substring(0, payloadSizeThreshold),
              accumulateObj,
            ),
      {},
    );

  const limitedKeys = limitSize(logObj);
  Object.assign(logObj, limitedKeys);

  return logObj;
};

export const configurableLimitValuesSize = (
  payloadSizeThreshold: number,
): TransformFunction => {
  return (info: TransformableInfo, opts?: any): TransformableInfo | boolean =>
    limitFieldValuesSize(info, payloadSizeThreshold);
};

export abstract class Logger {
  abstract log: LogMethod;
  abstract error: LeveledLogMethod;
  abstract warn: LeveledLogMethod;
  abstract help: LeveledLogMethod;
  abstract data: LeveledLogMethod;
  abstract info: LeveledLogMethod;
  abstract debug: LeveledLogMethod;
  abstract prompt: LeveledLogMethod;
  abstract http: LeveledLogMethod;
  abstract verbose: LeveledLogMethod;
  abstract input: LeveledLogMethod;
  abstract silly: LeveledLogMethod;
  abstract child(options: Record<string, any>): Logger;
}
