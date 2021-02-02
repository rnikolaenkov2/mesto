export default class UserInfo {
  constructor({selectorName, selectorRole}) {
    this._elementName = document.querySelector(selectorName);
    this._elementRole = document.querySelector(selectorRole);
  }

  getUserInfo() {
    this._userInfoData = {};
    this._userInfoData['.popup__input_func_name'] = this._elementName.textContent.trim();
    this._userInfoData['.popup__input_func_role'] = this._elementRole.textContent.trim();

    return this._userInfoData;
  }

  setUserInfo({name, role}) {
    this._elementName.textContent = name;
    this._elementRole.textContent = role;
  }
}
