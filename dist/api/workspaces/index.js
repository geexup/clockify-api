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
const clients_1 = require("./clients");
const projects_1 = require("./projects");
const tags_1 = require("./tags");
const time_entry_1 = require("./time-entry");
const clockify_error_1 = require("../../errors/clockify.error");
const user_1 = require("./user");
class CKLWorkspacesExistsError extends clockify_error_1.CKLError {
    constructor() {
        super(400, 'Workspace with that name already exists, or workspace name is not valid');
    }
}
exports.CKLWorkspacesExistsError = CKLWorkspacesExistsError;
class WorkspacesRoute extends subroute_1.ApiSubroute {
    /** Get sub routes (if call instance as a function) */
    __call__(workspaceId) {
        const self = this;
        const uri = `${this.uri}/${workspaceId}`;
        return {
            clients: new clients_1.ClientsRoute(`${uri}/clients`, this.main),
            projects: subroute_1.makeFunctionalSubroute(new projects_1.ProjectsRoute(`${uri}/projects`, this.main)),
            tags: new tags_1.TagsRoute(`${uri}/tags`, this.main),
            timeEntry: new time_entry_1.TimeEntryRoute(`${uri}/time-entries`, this.main),
            user: subroute_1.makeFunctionalSubroute(new user_1.WorkspaceUserRoute(`${uri}/user`, this.main)),
            users() {
                return self.makeApiRequest(`../workspace/${workspaceId}/users`, 'GET');
            }
        };
    }
    /** Find workspaces for currently logged in user */
    get() {
        return this.makeApiRequest('', 'GET');
    }
    /** Add a new workspace */
    post(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.makeApiRequest('', 'POST', body);
            }
            catch (e) {
                if (e.code === 400)
                    throw new CKLWorkspacesExistsError();
                throw e;
            }
        });
    }
}
exports.WorkspacesRoute = WorkspacesRoute;
