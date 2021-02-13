export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _check(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _sendGetRequest(url, method) {
    return fetch(url, {
      method: method,
      headers: this._headers,
    }).then((res) => {
      return this._check(res);
    })
  }

  getCardList() {
    return this._sendGetRequest(`${this._url}/cards`, 'GET')
  }


}
