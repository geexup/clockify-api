"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clockify_error_1 = require("./clockify.error");
class CKLForbiddenError extends clockify_error_1.CKLError {
    constructor() {
        super(403, 'Forbidden');
    }
}
exports.CKLForbiddenError = CKLForbiddenError;
