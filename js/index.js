import {initialCards} from './cards.js';
import Card from './Card.js';

const root = document.querySelector('.root');
const place = root.querySelector('.places');
const btnAddCard = root.querySelector('.profile__btn-add-img');
const popupList = root.querySelectorAll('.popup');
const btnPopupCloseList = root.querySelectorAll('.popup__btn-close');
const popupBigImage = root.querySelector('.popup_theme_photo');
const popupAddCard = root.querySelector('.popup_add-card');

/**
 * Генерация попап для карточки
 * @param {link, title} data
 */
function renderBigImage(data) {
  const img = popupBigImage.querySelector('.popup__photo');
  img.setAttribute('src', data.link);
  img.setAttribute('alt', data.title);
  popupBigImage.querySelector('.popup__title').textContent = data.title;
}

/**
 * Открытие попап для карточки
 */
function showBigImage() {
  popupBigImage.classList.add('popup_opened');
  root.addEventListener('keydown', handlerClosePopupByEsc);
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

function showAddCart() {
  popupAddCard.classList.add('popup_opened');
  root.addEventListener('keydown', handlerClosePopupByEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  root.removeEventListener('keydown', handlerClosePopupByEsc);
}

function clearPopup(popup) {
  const form = popup.querySelector('form');
  if(form) {
    form.reset();
  }
}


//initial cards
initialCards.forEach((item) => {
  const func = {
    renderBigImage,
    showBigImage,
    removeCard,
  };
  const card = new Card(item, '#card', func);
  const cardElement = card.generateCard();
  place.append(cardElement);
});


//open popup "add new card"
btnAddCard.addEventListener('click', (e) => {
  showAddCart();
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
})
