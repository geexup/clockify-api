"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subroute_1 = require("../subroute");
const workspaces_1 = require("./workspaces");
class WebApi extends subroute_1.ApiSubroute {
    constructor() {
        super(...arguments);
        this.workspaces = subroute_1.makeFunctionalSubroute(new workspaces_1.WebWorkspaces(`${this.uri}/workspaces`, this.main));
    }
}
exports.WebApi = WebApi;
