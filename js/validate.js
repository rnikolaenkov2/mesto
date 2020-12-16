const disableBtnSave = (form) => {
  const button = form.querySelector('.popup__btn-save');
  button.classList.add('popup__btn-save_disabled');
  button.setAttribute('disabled', 'disabled');
}

const enableBtnSave = (form) => {
  const button = form.querySelector('.popup__btn-save');
  button.classList.remove('popup__btn-save_disabled');
  button.removeAttribute('disabled');
}

const showErrorMsg = (form, inputElement, errorMsg) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.classList.add('popup__error_active');
  errorElement.textContent = errorMsg;
}

const hideErrorMsg = (form, inputElement) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_active');
  errorElement.textContent = '';
}

const hasInvalidInput = (inputList) => {
  return inputList.some((el) => {
    return !el.validity.valid;
  });
}

const isValid = (inputEl) => {
  return inputEl.validity.valid;
}

const setListeners = (formList) => {
  Array.from(formList).forEach((form) => {
    const inputList = form.querySelectorAll('.popup__input');
    Array.from(inputList).forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        if(isValid(inputEl)) {
          hideErrorMsg(form, inputEl, inputEl.validationMessage);
        } else {
          showErrorMsg(form, inputEl, inputEl.validationMessage);
        }
      })
    })
  });
}


/* test */
const form = document.querySelectorAll('.popup__form');
const el = document.querySelector('#profile-name');
// const inputList = form.querySelector('.popup__input');

setListeners(form);

// inputList.addEventListener('input', (e) => {
//   console.log(inputList.validity.valid);
// });

// console.log(hasInvalidInput(Array.from(inputList)));

// showErrorMsg(form, el, 'test');

// disableBtnSave(form);
/* end test */
