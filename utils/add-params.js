const addParams = (url, params) => {
  url += '?';
  for (const key in params) {
    url += key + '=' + params[key] + '&';
  }
  url = url.slice(0, -1);
  return url;
}

export default addParams;
