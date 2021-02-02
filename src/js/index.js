import '../pages/index.css';

import Section from '../components/Section.js';
import {cards} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

import {cardSelector, popupImageSelector, cardContainerSelector, formValidatorAddCard, btnAddCard} from '../utils/constants.js';

//валидация формы
const validationConfig = {
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
}

const addCardFormValidator = new FormValidator(validationConfig, formValidatorAddCard);
addCardFormValidator.enableValidation();

const popupAddCard = new PopupWithForm({
  selectorPopup: '.popup_add-card',
  handleSubmitForm: (formData) => {
    const card = new Card(formData, cardSelector, popupWithImage.open.bind(popupWithImage));
    const cardElement = card.generateCard();
    cardList.addElement(cardElement);
  },
  handleResetError: addCardFormValidator.clearErrors,
});

popupAddCard.setEventListeners();

btnAddCard.addEventListener('click', () => popupAddCard.open());

const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

const cardList = new Section({
  items: cards,
  renderer: (item) => {
    const card = new Card(item, cardSelector, popupWithImage.open.bind(popupWithImage));
    const cardElement = card.generateCard();
    cardList.setElement(cardElement);
  }
}, cardContainerSelector);

cardList.renderer();
