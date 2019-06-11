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
class CKLTimeEntryExistsError extends clockify_error_1.CKLError {
    constructor() {
        super(400, 'Project//Tag doesn\'t exist or doesn\'t belong to workspace; Task doesn\'t exist or doesn\'t belong to project; Start datetime is after end datetime;Time entry requires additional info (check workspace settings);');
    }
}
exports.CKLTimeEntryExistsError = CKLTimeEntryExistsError;
class CKLTimeEntryExistsPutError extends clockify_error_1.CKLError {
    constructor() {
        super(400, 'Project/Tag doesn\'t exist or doesn\'t belong to workspace; Task doesn\'t exist or doesn\'t belong to project; Start datetime is after end datetime');
    }
}
exports.CKLTimeEntryExistsPutError = CKLTimeEntryExistsPutError;
class CKLTimeEntryDeleteError extends clockify_error_1.CKLError {
    constructor() {
        super(400, 'Time entry with given ID doesn\'t exist or doesn\'t belong to workspace');
    }
}
exports.CKLTimeEntryDeleteError = CKLTimeEntryDeleteError;
class TimeEntryRoute extends subroute_1.ApiSubroute {
    /** Get time entry on workspace */
    get(timeEntryId) {
        return this.makeApiRequest(`${timeEntryId}`, 'GET');
    }
    /** Add a new time entry to workspace */
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
    /** Update time entry on workspace */
    put(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.makeApiRequest('', 'POST', body);
            }
            catch (e) {
                if (e.code === 400)
                    throw new CKLTimeEntryExistsPutError();
                throw e;
            }
        });
    }
    /** Delete time entry from workspace */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.makeApiRequest(`${id}`, 'DELETE');
            }
            catch (e) {
                if (e.code === 400)
                    throw new CKLTimeEntryDeleteError();
                throw e;
            }
        });
    }
}
exports.TimeEntryRoute = TimeEntryRoute;
