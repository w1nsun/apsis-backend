import { ICtx } from './types'

export class LoggerContext implements ICtx {
  constructor(readonly requestId: string) {}

  [key: string]: any
}
