"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clockify_error_1 = require("./clockify.error");
class CKLNotFoundError extends clockify_error_1.CKLError {
    constructor() {
        super(404, 'Not Found');
    }
}
exports.CKLNotFoundError = CKLNotFoundError;
