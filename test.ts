import {GQLNow} from "./index";

const url = "https://some.website.com/graphql/path";
const token = "addaadfadf"
let obj = new GQLNow(url,{'token':token});

obj.query("operation_name",{ token:token},"response_field_name").then((result)=>{
console.log(result);
})