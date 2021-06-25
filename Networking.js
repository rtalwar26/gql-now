"use strict";
/**
 * Created by rohittalwar on 13/04/16.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkFactory = exports.MyNetworkClient = void 0;
const axios_1 = require("axios");
class MyNetworkClient {
  constructor() {
    this.isReactive = false;
    this.headers = {};
  }
  setHttpHeaders(headersMap) {
    for (let key in headersMap) {
      this.headers[key] = headersMap[key];
    }
  }
  _net() {
    return axios_1.default.create({
      timeout: 10000,
      validateStatus: function (status) {
        return true; // default
      },
      headers: {
        ...this.headers,
      },
    });
  }
  async getDataFromCache(url, params) {
    return new Promise((resolve, reject) => {
      this.networkGET(url, params).then(resolve, reject);
    });
  }
  async networkGET(url, params) {
    return this._net().get(url, { params });
  }
  async get(url, params) {
    return this.getDataFromCache(url, params);
  }
  async post(url, params) {
    return this._net().post(url, params);
  }
  async put(url, params) {
    return this._net().put(url, params);
  }
  async delete(url, params) {
    return this._net().put(url, params);
  }
}
exports.MyNetworkClient = MyNetworkClient;
class NetworkFactory {
  static createSimpleClient() {
    return NetworkFactory._createSimpleClient();
  }
  static _createSimpleClient(token) {
    let net = new MyNetworkClient();
    return net;
  }
}
exports.NetworkFactory = NetworkFactory;
