import { NetworkFactory } from './Networking';
import { build_mutation_query, build_query } from './gqlquery/common';
export interface GQLClientInterface {
  query(operation: string, variables: any, fields: string): Promise<any>
}
export class GQLNow implements GQLClientInterface {
  private _url: string
  private _headers: Object
  private _defaults: Object
  constructor(url: string, headers: Object = {}, defaults: Object = {} ) {
    this._url = url;
    this._headers = headers;
    this._defaults = defaults;
  }
 
  async query(operation: string, variables: any, fields: string): Promise<any> {
    let q = await build_query(operation, variables, fields);
    return this.network_request(q);
  }

  async mutation(operation: string, variables: any, fields: string): Promise<any> {
    let q = await build_mutation_query(operation, variables, fields);
    return this.network_request(q);
  }
  private async network_request(q: string) {
    let net = NetworkFactory.createSimpleClient();
    net.setHttpHeaders(this._headers);
    net.setDefaults(this._defaults);
    let result = await net.post(this._url, { query: q });
    return result.data;
  }


}