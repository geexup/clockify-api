export class CKLError extends Error {
  constructor(
    public code: number,
    public status: string = 'Unknown'
  ) {
      super(`${code} - ${status}`);

      // Set the prototype explicitly.
      Object.setPrototypeOf(this, CKLError.prototype);
  }
}