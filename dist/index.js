"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const request_1 = require("request");
const api_1 = require("./api");
const clockify_error_1 = require("./errors/clockify.error");
const unauthorized_error_1 = require("./errors/unauthorized.error");
const forbidden_error_1 = require("./errors/forbidden.error");
const not_found_error_1 = require("./errors/not-found.error");
const subroute_1 = require("./subroute");
// Clockify time in MomentJS format string
const CLOCKIFY_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
const PRODUCER_MAP = {
    'GET': request_1.get,
    'POST': request_1.post,
    'DELETE': request_1.delete,
    'PUT': request_1.put,
    'PATCH': request_1.patch
};
class ClockifyApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.debugMode = process.env['CLOCKIFY_DEBUG'] === 'true';
        this.basePoint = 'https://api.clockify.me/api/v1';
        this.user = new api_1.UserRoute('user', this);
        this.workspaces = subroute_1.makeFunctionalSubroute(new api_1.WorkspacesRoute('workspaces', this));
    }
    parseParams(params) {
        const parts = [];
        const makePart = (key, val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
        for (const key in params) {
            const val = params[key];
            if (Array.isArray(val))
                parts.push(...val.map(item => makePart(key, item)));
            parts.push(makePart(key, val));
        }
        return parts.join('&');
    }
    /** Formats Date object to Clockify string date format */
    static formatDate(date) {
        return moment_1.default(date).format(CLOCKIFY_DATE_FORMAT);
    }
    prepareUri(uri) {
        const parts = uri.split('/');
        for (let i = 0; i < parts.length; i++) {
            if (parts[i] === '.') {
                parts.splice(i, 1);
                i -= 1;
                continue;
            }
            if (parts[i] === '..') {
                parts.splice(i - 1, 2);
                i -= 2;
                continue;
            }
            if (i < 0)
                throw new Error('Wrong uri: ' + uri);
        }
        return parts.join('/');
    }
    makeApiRequest(uri, method, params = {}) {
        return new Promise((resolve, reject) => {
            let url = `${this.basePoint}/${this.prepareUri(uri)}`;
            const requestProducer = PRODUCER_MAP[method];
            const requestParams = {
                headers: {
                    'X-Api-Key': this.apiKey
                }
            };
            if (method === 'GET') {
                url += '?' + this.parseParams(params);
            }
            else if (method === 'POST') {
                requestParams.json = params;
            }
            if (this.debugMode) {
                console.log(`[Clockify] [${method}]`, url);
                console.log(`[Clockify] [${method}] body:`, params);
            }
            requestProducer(url, requestParams, (err, resp, body) => {
                if (err)
                    return reject(err);
                if (resp.statusCode < 200 || resp.statusCode >= 300) {
                    if (resp.statusCode === 401)
                        return reject(new unauthorized_error_1.CKLUnauthorizedError());
                    if (resp.statusCode === 403)
                        return reject(new forbidden_error_1.CKLForbiddenError());
                    if (resp.statusCode === 404)
                        return reject(new not_found_error_1.CKLNotFoundError());
                    return reject(new clockify_error_1.CKLError(resp.statusCode));
                }
                try {
                    resolve(JSON.parse(body));
                }
                catch (_a) {
                    resolve(body);
                }
            });
        });
    }
}
exports.ClockifyApi = ClockifyApi;
