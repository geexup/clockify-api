import { CKLError } from './clockify.error';

export class CKLUnauthorizedError extends CKLError {
  constructor() {
      super(401, 'Unauthorized');
  }
}