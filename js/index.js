import {initialCards} from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const root = document.querySelector('.root');
const place = root.querySelector('.places');
const btnAddCard = root.querySelector('.profile__btn-add-img');
const popupList = root.querySelectorAll('.popup');

const btnPopupCloseList = root.querySelectorAll('.popup__btn-close');

const popupBigImage = root.querySelector('.popup_theme_photo');
const btnClosePopupBigImage = popupBigImage.querySelector('.popup__btn-close');
const popupBigImg = popupBigImage.querySelector('.popup__photo');
const popupBigTitle = popupBigImage.querySelector('.popup__title');

const popupAddCard = root.querySelector('.popup_add-card');
const btnClosePopupAddCard = popupAddCard.querySelector('.popup__btn-close');
const addCardForm = popupAddCard.querySelector('.popup__form');
const addCardName = addCardForm.querySelector('.popup__input_name')
const addCardLink = addCardForm.querySelector('.popup__input_link')
const addCardErrorList = addCardForm.querySelectorAll('.popup__error');
const addCardInputList = addCardForm.querySelectorAll('.popup__input');

const name = root.querySelector('.profile__name');
const job = root.querySelector('.profile__role');

const popupEditProfile = root.querySelector('.popup_edit-profile');
const btnProfileChange = root.querySelector('.profile__btn-change');
const btnCloseProfileChange = popupEditProfile.querySelector('.popup__btn-close');
const editProfileErrorList = popupEditProfile.querySelectorAll('.popup__error');
const editProfileInputList = popupEditProfile.querySelectorAll('.popup__input');

const popupInputName = popupEditProfile.querySelector('.popup__input_func_name');
const popupInputRole = popupEditProfile.querySelector('.popup__input_func_role');

const cardSelector = '#card';

const formValidatorEditProfile = popupEditProfile.querySelector('.popup__form');
const formValidatorAddCard = popupAddCard.querySelector('.popup__form');

/**
 * Открытие попап
 */
function showPopup(popup) {
  popup.classList.add('popup_opened');
  root.addEventListener('keydown', handlerClosePopupByEsc);
}

/**
 * Открытие попап для карточки
 */
function showBigImage(link, title) {
  popupBigImg.setAttribute('src', link);
  popupBigImg.setAttribute('alt', title);
  popupBigTitle.textContent = title;

  showPopup(popupBigImage);
}

/**
 * Обработчик закрытия попапов при нажатии на Esc
 */
function handlerClosePopupByEsc(e) {
  if (e.key === 'Escape') {
    Array.from(popupList).forEach((item) => {
      // clearPopup(item);
      closePopup(item);
    })
  }
}

/**
 * Удаление карточки
 * @param {*} card
 */
function removeCard(card) {
  card.remove();
}


/**
 * Открытие попап для добавления карточки
 */
function showAddCart() {
  popupAddCard.classList.add('popup_opened');
  root.addEventListener('keydown', handlerClosePopupByEsc)
}

/**
 * Закрытие popup
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  root.removeEventListener('keydown', handlerClosePopupByEsc);
}

/**
 * Очистка поле формы попаппа
 */
function clearPopup(popup) {
  const form = popup.querySelector('form');
  form.reset();
}

/**
 * Открытие попапа реадктирование профиля
 */
function showPopupEditProfile() {
  popupEditProfile.classList.add('popup_opened');

  root.addEventListener('keydown', handlerClosePopupByEsc);
}

/**
 * Установка input в форму попапа для редактирования профиля
 */
function setInputEditProfileForm() {
  popupInputName.value = name.textContent.trim();
  popupInputRole.value = job.textContent.trim();
}

function createCard(data) {
  return new Card(data, cardSelector, showBigImage).generateCard();
}

function addCardSubmitHandler(e) {
  e.preventDefault();

  const data = {name: addCardName.value, link: addCardLink.value};

  const cardElement = createCard(data);
  place.prepend(cardElement);

  clearPopup(popupAddCard);
  closePopup(popupAddCard);
}

/**
 * Обработчик редактирование профиля
 */
function editProfileSubmitHandler(e) {
  e.preventDefault();
  name.textContent = popupInputName.value;
  job.textContent = popupInputRole.value;
  clearPopup(popupEditProfile);
  closePopup(popupEditProfile);
}


//initial cards
initialCards.forEach((item) => {
  const cardElement = createCard(item);
  place.append(cardElement);
});

//валидация формы
const validationConfig = {
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
}

new FormValidator(validationConfig, formValidatorAddCard).enableValidation();

function clearErrors(errorList, inputList) {
  Array.from(errorList).forEach((element) => {
    element.classList.remove('popup__error_active');
    element.textContent = '';
  });

  Array.from(inputList).forEach((element) => {
    element.classList.remove('popup__input_type_error')
  });
}

//open popup "add new card"
btnAddCard.addEventListener('click', () => {
  clearErrors(addCardErrorList, addCardInputList);
  showAddCart();
});

new FormValidator(validationConfig, formValidatorEditProfile).enableValidation();

//открыие попап редактирование профиля
btnProfileChange.addEventListener('click', () => {
  clearErrors(editProfileErrorList, editProfileInputList);
  setInputEditProfileForm();
  showPopupEditProfile();
});

//close popup popup Big Image
btnClosePopupBigImage.addEventListener('click', () => {
  closePopup(popupBigImage);
});

//close popup add card
btnClosePopupAddCard.addEventListener('click', () => {
  clearPopup(popupAddCard);
  closePopup(popupAddCard);
})

//close popup edit profile
btnCloseProfileChange.addEventListener('click', () => {
  clearPopup(popupEditProfile);
  closePopup(popupEditProfile);
})

popupBigImage.addEventListener('click', (e) => {
  e.stopPropagation();
  if(e.target.classList.contains('popup')){
    closePopup(popupBigImage);
  }
});

popupEditProfile.addEventListener('click', (e) => {
  e.stopPropagation();
  if(e.target.classList.contains('popup')){
    clearPopup(popupEditProfile);
    closePopup(popupEditProfile);
  }
})

popupAddCard.addEventListener('click', (e) => {
  e.stopPropagation();
  if(e.target.classList.contains('popup')){
    clearPopup(popupAddCard);
    closePopup(popupAddCard);
  }
})

popupAddCard.addEventListener('submit', addCardSubmitHandler);
popupEditProfile.addEventListener('submit', editProfileSubmitHandler);
