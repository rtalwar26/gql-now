
const wrap_in_quotes = (p: string): string => {
    return `"` + p.replace(/\"/g, '\\"').replace(/\\\\"/g, '\\\\\\"') + `"`;
}

const build_params = (obj: any): any => {
    switch (typeof obj) {
        case 'number':
            return obj;
        case 'string':
            return wrap_in_quotes(obj);
        case 'boolean':
            return obj;
        case 'object':
            let isArray = obj instanceof Array
            return isArray ? `[${obj.map((i: any) => build_params(i)).join(',')}]` : `{${Object.keys(obj).map((k) => `${k}:${build_params(obj[k])}`)}}`

    }
}
const build_query_string = async (type: string, operation: string, variables: any, fields: string) => {
    let keys = Object.keys(variables);
    let param_str = keys.map((k) => `${k}:${build_params(variables[k])}`).join(',');
    let query_str = `${type} {${operation}`
    query_str += (variables && keys.length) ? `(${param_str})` : '';
    query_str += fields ? `{
              ${fields}
            }` : '';
    query_str += '}';
    return query_str;

}
export const build_query = async (operation: string, variables: any, fields: string) => {

    return build_query_string('query', operation, variables, fields);
}

export const build_mutation_query = async (operation: string, variables: any, fields: string) => {
    return build_query_string('mutation', operation, variables, fields);
}


export const network_request = async (q: string, subpath: string) => {
    let w: any = window;
    let shouldFetch = w.app && w.app.data.base_url && (typeof window !== 'undefined');
    !shouldFetch && (() => {
        throw new Error('window.app.data.base_url not found');
    })();

    let r = await fetch(`${w.app.data.base_url}${subpath}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': w.app.data.token

        },
        body: JSON.stringify({ query: q })
    });
    return (await r.json());
};