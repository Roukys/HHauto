export function queryStringGetParam(inQueryString, inParam)
{
    let urlParams = new URLSearchParams(inQueryString);
    return urlParams.get(inParam);
}

export function url_add_param(url, param, value) {
    if (url.indexOf('?') === -1) url += '?';
    else url += '&';
    return url+param+"="+value;
}