"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const subroute_1 = require("../../subroute");
const clockify_error_1 = require("../../errors/clockify.error");
class CKLTagExistsError extends clockify_error_1.CKLError {
    constructor() {
        super(400, 'Tag with that name already exists on workspace');
    }
}
exports.CKLTagExistsError = CKLTagExistsError;
class TagsRoute extends subroute_1.ApiSubroute {
    /** Find tags on workspace */
    get(params = {
        page: 1,
        'page-size': 50
    }) {
        return this.makeApiRequest('', 'GET', params);
    }
    /** Add a new tag to workspace */
    post(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.makeApiRequest('', 'POST', body);
            }
            catch (e) {
                if (e.code === 400)
                    throw new CKLTagExistsError();
                throw e;
            }
        });
    }
}
exports.TagsRoute = TagsRoute;
