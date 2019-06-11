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
const task_1 = require("./task");
class CKLProjectExistsError extends clockify_error_1.CKLError {
    constructor() {
        super(400, 'Project with that name already exists on workspace.');
    }
}
exports.CKLProjectExistsError = CKLProjectExistsError;
class CKLProjectNoIdError extends clockify_error_1.CKLError {
    constructor() {
        super(400, 'Project with that name already exists on workspace.');
    }
}
exports.CKLProjectNoIdError = CKLProjectNoIdError;
class ProjectsRoute extends subroute_1.ApiSubroute {
    /** Get sub routes (if call instance as a function) */
    __call__(projectId) {
        const uri = `${this.uri}/${projectId}`;
        return {
            task: new task_1.TasksRoute(`${uri}/tasks`, this.main)
        };
    }
    /** Find projects on workspace */
    get(params = {
        page: 1,
        'page-size': 50
    }) {
        return this.makeApiRequest('', 'GET', params);
    }
    /** Add a new project to workspace */
    post(
    /** Contains info about new project. */
    body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.makeApiRequest('', 'POST', body);
            }
            catch (e) {
                if (e.code === 400)
                    throw new CKLProjectExistsError();
                throw e;
            }
        });
    }
    /** Delete project from workspace */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.makeApiRequest(`${id}`, 'DELETE');
            }
            catch (e) {
                if (e.code === 400)
                    throw new CKLProjectNoIdError();
                throw e;
            }
        });
    }
}
exports.ProjectsRoute = ProjectsRoute;
