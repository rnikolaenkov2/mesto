export default class UserInfo {
  constructor({selectorName, selectorRole, selectorAva}) {
    this._elementName = document.querySelector(selectorName);
    this._elementRole = document.querySelector(selectorRole);
    this._elementAva = document.querySelector(selectorAva);
  }

  getUserInfo() {
    this._userInfoData = {};
    this._userInfoData['.popup__input_func_name'] = this._elementName.textContent.trim();
    this._userInfoData['.popup__input_func_role'] = this._elementRole.textContent.trim();

    return this._userInfoData;
  }

  setUserInfo({name, about, avatar}) {
    this._elementName.textContent = name;
    this._elementRole.textContent = about;
    if (avatar !== undefined) {
      this._elementAva.setAttribute('src', avatar);
      this._elementAva.setAttribute('alt', name);
    }
  }
}
