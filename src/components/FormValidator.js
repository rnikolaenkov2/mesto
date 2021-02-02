export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._config = config;
    this.clearErrors = this.clearErrors.bind(this);
  }

  _isValid(inputEl) {
    if (!inputEl.validity.valid) {
      this._showError(inputEl, inputEl.validationMessage);
    } else {
      this._hideError(inputEl);
    }
  }

  _hasInvalidInput(inputList) {
    return Array.from(inputList).some((inputEl) => {
      return !inputEl.validity.valid;
    })
  }

  _showError(inputEl, msg) {
    const errorEl = this._form.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.add(this._config.inputErrorClass);
    errorEl.textContent = msg;
    errorEl.classList.add(this._config.errorClass);
  }

  _hideError(inputEl) {
    const errorEl = this._form.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.remove(this._config.inputErrorClass);
    errorEl.textContent = '';
    errorEl.classList.remove(this._config.errorClass);
  }

  _disableBtnSave() {
    this._btnSave.classList.add(this._config.inactiveButtonClass);
    this._btnSave.setAttribute('disabled', 'disabled');
  }

  _enableBtnSave() {
    this._btnSave.classList.remove(this._config.inactiveButtonClass);
    this._btnSave.removeAttribute('disabled');
  }

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._disableBtnSave();
    } else {
      this._enableBtnSave();
    }
  }

  _setListeners() {
    this._inputList.forEach((item) => {
      item.addEventListener('input', () => {
        this._isValid(item);
        this._toggleButtonState(this._inputList);
      })
    })
  }

  clearErrors() {
    this._inputList.forEach((item) => {
      this._hideError(item);
    });
    this._disableBtnSave();
  }

  enableValidation() {
    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
    this._inputList.forEach((item) => {
      this._hideError(item);
    });
    this._btnSave = this._form.querySelector(this._config.submitButtonSelector)
    this._disableBtnSave(this._btnSave);
    this._setListeners();
  }
}
