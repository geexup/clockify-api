"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subroute_1 = require("../../../subroute");
class WebUser extends subroute_1.ApiSubroute {
    __call__(userId) {
        const self = this;
        const uri = `${this.uri}/${userId}`;
        return {
            entriesInRange(body) {
                return self.main.makeApiRequest(`${uri}/entriesInRange`, 'POST', body);
            }
        };
    }
}
exports.WebUser = WebUser;
