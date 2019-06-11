"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiSubroute {
    constructor(uri, main) {
        this.uri = uri;
        this.main = main;
    }
    makeApiRequest(uri, method, params) {
        return this.main.makeApiRequest(`${this.uri}/${uri}`, method, params);
    }
}
exports.ApiSubroute = ApiSubroute;
function makeFunctionalSubroute(self) {
    const fn = new Function('...args', 'return this.__call__(...args)');
    const result = fn.bind(self);
    // @ts-ignore
    Object.setPrototypeOf(result, self.__proto__);
    Object.assign(result, self);
    return result;
}
exports.makeFunctionalSubroute = makeFunctionalSubroute;
