"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subroute_1 = require("../../../subroute");
const time_entries_1 = require("./time-entries");
class WorkspaceUserRoute extends subroute_1.ApiSubroute {
    __call__(userId) {
        const uri = `${this.uri}/${userId}`;
        return {
            timeEntries: new time_entries_1.UserTimeEntriesSubroute(`${uri}/time-entries`, this.main)
        };
    }
}
exports.WorkspaceUserRoute = WorkspaceUserRoute;
