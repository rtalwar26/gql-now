/**
 * Created by rohittalwar on 22/04/16.
 */

export interface ModelProtocol {
    get(id?: string, options?: Object): Promise<any>
    query(params?: Object, options?: Object): Promise<any>
    add(params: Object): Promise<any>
    put(id: string, params: Object): Promise<any>
    remove(id: string, options?: Object): Promise<any>
}


export interface NetworkInterface {
    get(url: string, params?: Object): Promise<any>
    post(url: string, params?: Object): Promise<any>
    put(url: string, params?: Object): Promise<any>
    delete(url: string, params?: Object): Promise<any>
    setHttpHeaders(headers: Object):void
    setDefaults(headers: Object):void
}

