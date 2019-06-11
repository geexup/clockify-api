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
const subroute_1 = require("../../../subroute");
const clockify_error_1 = require("../../../errors/clockify.error");
class CKLTimeEntryExistsError extends clockify_error_1.CKLError {
    constructor() {
        super(400, 'Project/Tag/User doesn\'t exist or doesn\'t belong to workspace; Task doesn\'t exist or doesn\'t belong to project; Start datetime is after end datetime;Time entry requires additional info (check workspace settings)');
    }
}
exports.CKLTimeEntryExistsError = CKLTimeEntryExistsError;
class CKLTimeEntryPatchError extends clockify_error_1.CKLError {
    constructor() {
        super(400, 'Required information is not present on currently running time entry. Check your workspace settings.');
    }
}
exports.CKLTimeEntryPatchError = CKLTimeEntryPatchError;
class UserTimeEntriesSubroute extends subroute_1.ApiSubroute {
    /**
     * Find time entries for user on workspace
     *
     * Requires `WORKSPACE_OWN` or `WORKSPACE_ADMIN` permissions to see other user's time entries.
     */
    get(params = {}) {
        return this.makeApiRequest('', 'GET', params);
    }
    /** Add a new time entry for another user on workspace */
    post(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.makeApiRequest('', 'POST', body);
            }
            catch (e) {
                if (e.code === 400)
                    throw new CKLTimeEntryExistsError();
                throw e;
            }
        });
    }
    /** Add a new time entry for another user on workspace */
    patch(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.makeApiRequest('', 'PATCH', body);
            }
            catch (e) {
                if (e.code === 400)
                    throw new CKLTimeEntryPatchError();
                throw e;
            }
        });
    }
}
exports.UserTimeEntriesSubroute = UserTimeEntriesSubroute;
