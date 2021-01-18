import {initialCards} from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const root = document.querySelector('.root');
const place = root.querySelector('.places');
const btnAddCard = root.querySelector('.profile__btn-add-img');
const popupList = root.querySelectorAll('.popup');
const btnPopupCloseList = root.querySelectorAll('.popup__btn-close');
const popupBigImage = root.querySelector('.popup_theme_photo');
const img = popupBigImage.querySelector('.popup__photo');
const popupAddCard = root.querySelector('.popup_add-card');
const name = root.querySelector('.profile__name');
const job = root.querySelector('.profile__role');
const popupEditProfile = root.querySelector('.popup_edit-profile');
const btnProfileChange = root.querySelector('.profile__btn-change');

const popupInputName = popupEditProfile.querySelector('.popup__input_func_name');
const popupInputRole = popupEditProfile.querySelector('.popup__input_func_role');

/**
 * Открытие попап для карточки
 */
function showPopup(popup) {
  popup.classList.add('popup_opened');
  root.addEventListener('keydown', handlerClosePopupByEsc);
}

function showBigImage(link, title) {
  img.setAttribute('src', link);
  img.setAttribute('alt', title);
  popupBigImage.querySelector('.popup__title').textContent = title;
  showPopup(popupBigImage);
}

/**
 * Обработчик закрытия попапов при нажатии на Esc
 * @param {*} e
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
 * Установка inptu в форму попапа для редактирования профиля
 */
function setInputEditProfileForm() {
  popupInputName.value = name.textContent.trim();
  popupInputRole.value = job.textContent.trim();
}

function addCardSubmitHandler(e) {
  e.preventDefault();
  const form = popupAddCard.querySelector('.popup__form');
  const data = {name: form.querySelector('.popup__input_name').value, link:form.querySelector('.popup__input_link').value};

  const card = new Card(data, '#card', showBigImage);
  const cardElement = card.generateCard();
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
  const card = new Card(item, '#card', showBigImage);
  const cardElement = card.generateCard();
  place.append(cardElement);
});

//валидация формы
const config = {
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
}

const formVaildatorAddCard = new FormValidator(config, popupAddCard.querySelector('.popup__form'));

//open popup "add new card"
btnAddCard.addEventListener('click', (e) => {
  showAddCart();
  formVaildatorAddCard.enableValidation();
});

const formVaildatorEditProfile = new FormValidator(config, popupEditProfile.querySelector('.popup__form'));

//открыие попап редактирование профиля
btnProfileChange.addEventListener('click', () => {
  setInputEditProfileForm();
  showPopupEditProfile();
  formVaildatorEditProfile.enableValidation();
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
