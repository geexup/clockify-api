"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clockify_error_1 = require("./clockify.error");
class CKLUnauthorizedError extends clockify_error_1.CKLError {
    constructor() {
        super(401, 'Unauthorized');
    }
}
exports.CKLUnauthorizedError = CKLUnauthorizedError;
