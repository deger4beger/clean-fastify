"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function throwError(statusCode, message, thrownError) {
    if (thrownError) {
        this.log.error(thrownError);
    }
    const err = new Error();
    err.statusCode = statusCode;
    err.message = message;
    return err;
}
exports.default = throwError;
