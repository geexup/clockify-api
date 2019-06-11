"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subroute_1 = require("../../subroute");
class UserRoute extends subroute_1.ApiSubroute {
    /** Get currently logged in user's info */
    get() {
        return this.makeApiRequest('', 'GET');
    }
}
exports.UserRoute = UserRoute;
