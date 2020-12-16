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

const isValid = (formEl, inputEl, errorMsg) => {
  if (inputEl.validity.valid) {
    hideErrorMsg(formEl, inputEl, errorMsg);
  } else {
    showErrorMsg(formEl, inputEl, errorMsg);
  }
}



const formEl = document.querySelector('.popup__form');
const inputList  = formEl.querySelectorAll('.popup__input');
Array.from(inputList).forEach((inputEl) => {
  const errorMsg = inputEl.validateMessage;

});
console.log(formEl);

// const hasInvalidInput = (inputList) => {
//   return inputList.some((el) => {
//     return !el.validity.valid;
//   });
// }

// const isValid = (form, inputEl) => {
//   // console.log(form);
//   console.log(inputEl.validity.valid);
//   if(inputEl.validity.valid) {
//     hideErrorMsg(form, inputEl, inputEl.validationMessage);
//   } else {
//     showErrorMsg(form, inputEl, inputEl.validationMessage);
//   }
// }

// const setListeners = (form, ) => {
//   Array.from(formList).forEach((form) => {
//     const inputList = form.querySelectorAll('.popup__input');
//     Array.from(inputList).forEach((inputEl) => {
//       inputEl.addEventListener('input', isValid(form, inputEl));
//     })
//   });
// }

// const enableValidation = () => {
//   const formList = document.querySelectorAll('.popup__form');
//   Array.from(formList).forEach((form) => {
//     const inputList = form.querySelectorAll('.popup__input');
//     Array.from(inputList).forEach((inputEl) => {
//       isValid(form, inputEl);
//     })
//   })
//   console.log(formList);
//   // setListeners(formList);
// }

/* test */

// const el = document.querySelector('#profile-name');
// const inputList = form.querySelector('.popup__input');

// enableValidation();

// inputList.addEventListener('input', (e) => {
//   console.log(inputList.validity.valid);
// });

// console.log(hasInvalidInput(Array.from(inputList)));

// showErrorMsg(form, el, 'test');

// disableBtnSave(form);
/* end test */
