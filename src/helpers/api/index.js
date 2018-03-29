//@flow
const getWithParams = (url:Object,params:Object)=>{
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url;
}
export const api = {
    twitter:(query:string)=>{
        let url = new URL('https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search'),
            params = {
                q:query
            };
        return fetch(getWithParams(url,params))
        .then((resp)=>resp.json())
        .then((resp)=>resp)
        .catch((e)=>(new Error(e)))
    }
};