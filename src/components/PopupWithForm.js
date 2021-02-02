import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({selectorPopup, handleSubmitForm}) {
    super(selectorPopup);
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValue() {

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  addData(data) {
    for (let key in data) {
      this._popup.querySelector(key).value = data[key];
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmitForm(this._getInputValue());
      this.close();
    });
  }

  _reset() {
    this._form.reset();
  }

  close() {
    super.close();
    this._reset();
  }
}
