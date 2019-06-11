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
const clockify_error_1 = require("../../../errors/clockify.error");
const subroute_1 = require("../../../subroute");
class CKLTaskExistsError extends clockify_error_1.CKLError {
    constructor() {
        super(400, 'Task with that name already exists on project, or specified project doesn\'t exist');
    }
}
exports.CKLTaskExistsError = CKLTaskExistsError;
class TasksRoute extends subroute_1.ApiSubroute {
    /** Find tasks on project */
    get(params = {
        page: 1,
        'page-size': 50
    }) {
        return this.makeApiRequest('', 'GET', params);
    }
    /** Add a new task on project */
    post(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.makeApiRequest('', 'POST', body);
            }
            catch (e) {
                if (e.code === 400)
                    throw new CKLTaskExistsError();
                throw e;
            }
        });
    }
}
exports.TasksRoute = TasksRoute;
