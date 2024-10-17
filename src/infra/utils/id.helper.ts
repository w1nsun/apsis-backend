import { v4 } from 'uuid';

export class IdHelper {
  static genID() {
    return v4();
  }
}
