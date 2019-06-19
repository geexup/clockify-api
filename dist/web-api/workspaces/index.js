"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subroute_1 = require("../../subroute");
const time_entries_1 = require("./time-entries");
class WebWorkspaces extends subroute_1.ApiSubroute {
    __call__(workspaceId) {
        const uri = `${this.uri}/${workspaceId}`;
        return {
            timeEntries: new time_entries_1.WebTimeEntries(`${uri}/timeEntries`, this.main)
        };
    }
}
exports.WebWorkspaces = WebWorkspaces;
