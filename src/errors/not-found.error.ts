import { CKLError } from './clockify.error';

export class CKLNotFoundError extends CKLError {
  constructor() {
      super(404, 'Not Found');
  }
}