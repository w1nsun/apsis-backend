export type AnyError = Error & {
  code?: string | number;
  statusCode?: string | number;
};

export class LoggerUtil {
  static formatError(err: AnyError) {
    return {
      message: err?.message,
      code: err?.code,
      statusCode: err?.statusCode,
      stack: err?.stack,
    };
  }
}
