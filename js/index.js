import {initialCards} from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const root = document.querySelector('.root');
const place = root.querySelector('.places');
const btnAddCard = root.querySelector('.profile__btn-add-img');
const popupList = root.querySelectorAll('.popup');
const btnPopupCloseList = root.querySelectorAll('.popup__btn-close');
const popupBigImage = root.querySelector('.popup_theme_photo');
const popupBigImg = popupBigImage.querySelector('.popup__photo');
const popupBigTitle = popupBigImage.querySelector('.popup__title');
const popupAddCard = root.querySelector('.popup_add-card');
const name = root.querySelector('.profile__name');
const job = root.querySelector('.profile__role');
const popupEditProfile = root.querySelector('.popup_edit-profile');
const btnProfileChange = root.querySelector('.profile__btn-change');

const popupInputName = popupEditProfile.querySelector('.popup__input_func_name');
const popupInputRole = popupEditProfile.querySelector('.popup__input_func_role');

const addCardForm = popupAddCard.querySelector('.popup__form');
const addCardName = addCardForm.querySelector('.popup__input_name')
const addCardLink = addCardForm.querySelector('.popup__input_link')
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
      clearPopup(item);
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
  if(form) {
    form.reset();
  }
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

//open popup "add new card"
btnAddCard.addEventListener('click', (e) => {
  showAddCart();

});

new FormValidator(validationConfig, formValidatorEditProfile).enableValidation();

//открыие попап редактирование профиля
btnProfileChange.addEventListener('click', () => {
  setInputEditProfileForm();
  showPopupEditProfile();

});


//close popup
btnPopupCloseList.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const el = evt.target.closest('.popup')
    if (!el.classList.contains('popup popup_theme_photo')) {
      clearPopup(el);
    }
    closePopup(el);
  });
});

popupList.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    const el = e.target;
    if(el.classList.contains('popup')) {
      clearPopup(item);
      closePopup(item);
    }
  });
});

popupAddCard.addEventListener('submit', addCardSubmitHandler);
popupEditProfile.addEventListener('submit', editProfileSubmitHandler);
