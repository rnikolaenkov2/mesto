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

  _sendPostRequest(url, data) {
    const fullUrl = `${this._url}/${url}`;
    return fetch(fullUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      return this._check(res);
    })
  }

  _sendDeleteRequest(url) {
    const fullUrl = `${this._url}/${url}`;
    return fetch(fullUrl, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._check(res);
    })
  }

  _sendPutRequest(url) {
    const fullUrl = `${this._url}/${url}`;
    return fetch(fullUrl, {
      method: 'PUT',
      headers: this._headers,
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

  addCard(name, link) {
    return this._sendPostRequest('cards', {name: name, link: link});
  }

  deleteCard(cardId) {
    return this._sendDeleteRequest(`cards/${cardId}`);
  }

  addLike(cardId) {
    return this._sendPutRequest(`cards/likes/${cardId}`);
  }

  deleteLike(cardId) {
    return this._sendDeleteRequest(`cards/likes/${cardId}`);
  }

}
