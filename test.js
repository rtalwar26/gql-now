"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const url = "https://some.website.com/graphql/path";
const token = "addaadfadf";
let obj = new index_1.GQLNow(url, { 'token': token });
obj.query("operation_name", { token: token }, "response_field_name").then((result) => {
    console.log(result);
});
