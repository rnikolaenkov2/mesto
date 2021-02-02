import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({selectorPopup, handleSubmitForm, handleResetError}) {
    super(selectorPopup);
    this._handleSubmitForm = handleSubmitForm;
    this._handleResetError = handleResetError;
  }

  _getInputValue() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__form').addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmitForm(this._getInputValue());
      this.close();
    });
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
    this._handleResetError();
  }
}
