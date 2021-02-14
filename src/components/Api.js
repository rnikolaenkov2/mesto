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

  _sendGetRequest(url) {
    const fullUrl = `${this._url}/${url}`;
    return fetch(fullUrl, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this._check(res);
    })
  }

  _sendPatchRequest(url, data) {
    const fullUrl = `${this._url}/${url}`;
    return fetch(fullUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      return this._check(res);
    })
  }

  getCardList() {
    return this._sendGetRequest('cards');
  }

  getProfile() {
    return this._sendGetRequest('users/me');
  }

  editProfile(name, about) {
    return this._sendPatchRequest('users/me', {name: name, about: about});
  }


}
