import {initialCards} from './cards.js';
import Card from './Card.js';

const root = document.querySelector('.root');
const place = root.querySelector('.places');
const btnAddCard = root.querySelector('.profile__btn-add-img');
const popupList = root.querySelectorAll('.popup');
const btnPopupCloseList = root.querySelectorAll('.popup__btn-close');


//initial cards
initialCards.forEach((item) => {
  const card = new Card(item, '#card');
  const cardElement = card.generateCard();
  // card.toggleLike();
  place.append(cardElement);
});

function handlerClosePopupByEsc(e) {
  if (e.key === 'Escape') {
    Array.from(popupList).forEach((item) => {
      clearPopup(item);
      closePopup(item);
    })
  }
}

function openPopup(data, popup) {
  popup.classList.add('popup_opened');
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

//open popup "add new card"
btnAddCard.addEventListener('click', (e) => {
  const popup = root.querySelector('.popup_add-card');
  openPopup({}, popup);
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
