const config = {
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
}

const isValid = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideError(formEl, inputEl, config);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  })
}

const showError = (formEl, inputEl, msg, config) => {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.add(config.inputErrorClass);
  errorEl.textContent = msg;
  errorEl.classList.add(config.errorClass);
}

const disableBtnSave = (buttonEl, config) => {
  buttonEl.classList.add(config.inactiveButtonClass);
  buttonEl.setAttribute('disabled', 'disabled');
}

const enableBtnSave = (buttonEl, config) => {
  buttonEl.classList.remove(config.inactiveButtonClass);
  buttonEl.removeAttribute('disabled');
}

const hideError = (formEl, inputEl, config) => {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.remove(config.inputErrorClass);
  errorEl.textContent = '';
  errorEl.classList.remove(config.errorClass);
}

const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disableBtnSave(buttonEl, config);
  } else {
    enableBtnSave(buttonEl, config);
  }
}

const setListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', () => {
      isValid(formEl, inputEl, config);
      toggleButtonState(inputList, buttonEl, config);
    })
  })
}

const enableValidation = (config) => {
  const formList = Array.from(document.forms);
  formList.forEach((formEl) => {
    setListeners(formEl, config);
  })
}

enableValidation(config);

