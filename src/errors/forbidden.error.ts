import { CKLError } from './clockify.error';

export class CKLForbiddenError extends CKLError {
  constructor() {
      super(403, 'Forbidden');
  }
}