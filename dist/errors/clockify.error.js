"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CKLError extends Error {
    constructor(code, status = 'Unknown') {
        super(`${code} - ${status}`);
        this.code = code;
        this.status = status;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CKLError.prototype);
    }
}
exports.CKLError = CKLError;
