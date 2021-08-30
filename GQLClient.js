"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Networking_1 = require("./Networking");
const common_1 = require("./gqlquery/common");
class GQLNow {
    constructor(url, headers = {}) {
        this._url = url;
        this._headers = headers;
    }
    async query(operation, variables, fields) {
        let q = await common_1.build_query(operation, variables, fields);
        return this.network_request(q);
    }
    async mutation(operation, variables, fields) {
        let q = await common_1.build_mutation_query(operation, variables, fields);
        return this.network_request(q);
    }
    async network_request(q) {
        let net = Networking_1.NetworkFactory.createSimpleClient();
        net.setHttpHeaders(this._headers);
        let result = await net.post(this._url, { query: q });
        return result.data;
    }
}
exports.GQLNow = GQLNow;
