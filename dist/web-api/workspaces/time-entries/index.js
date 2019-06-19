"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subroute_1 = require("../../../subroute");
const user_1 = require("./user");
class WebTimeEntries extends subroute_1.ApiSubroute {
    constructor() {
        super(...arguments);
        this.user = subroute_1.makeFunctionalSubroute(new user_1.WebUser(`${this.uri}/user`, this.main));
    }
}
exports.WebTimeEntries = WebTimeEntries;
