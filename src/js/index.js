import '../pages/index.css';

import Section from '../components/Section.js';
import {cards} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  cardSelector,
  popupImageSelector,
  cardContainerSelector,
  formValidatorAddCard,
  btnAddCard,
  formValidatorEditProfile,
  btnProfileChange,
  validationConfig
} from '../utils/constants.js';


//добавление карточки
const addCardFormValidator = new FormValidator(validationConfig, formValidatorAddCard);
addCardFormValidator.enableValidation();

const popupAddCard = new PopupWithForm({
  selectorPopup: '.popup_add-card',
  handleSubmitForm: (formData) => {
    const card = new Card(formData, cardSelector, popupWithImage.open.bind(popupWithImage));
    const cardElement = card.generateCard();
    cardList.addElement(cardElement);
  }
});

popupAddCard.setEventListeners();
btnAddCard.addEventListener('click', () => {
  addCardFormValidator.clearErrors();
  popupAddCard.open();
});

//редактирование профиля
const editProfileFormValidator = new FormValidator(validationConfig, formValidatorEditProfile);
editProfileFormValidator.enableValidation();

const userInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorRole: '.profile__role'
});

const popupEditProfile = new PopupWithForm({
  selectorPopup: '.popup_edit-profile',
  handleSubmitForm: (formData) => {
    userInfo.setUserInfo(formData);
  }
});

popupEditProfile.setEventListeners();
btnProfileChange.addEventListener('click', () => {
  editProfileFormValidator.clearErrors();
  const userInfoData = userInfo.getUserInfo();
  popupEditProfile.addData(userInfoData);
  popupEditProfile.open()
});

//рендер карточек
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
