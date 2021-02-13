import './index.css';

import Section from '../components/Section.js';
import {cards} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  cardSelector,
  popupImageSelector,
  cardContainerSelector,
  validationConfig,
  apiConfig
} from '../utils/constants.js';

const formValidatorAddCard = document.querySelector('.popup_add-card').querySelector('.popup__form');
const btnAddCard = document.querySelector('.profile__btn-add-img');
const formValidatorEditProfile = document.querySelector('.popup_edit-profile').querySelector('.popup__form');
const btnProfileChange = document.querySelector('.profile__btn-change');

const api = new Api({
  url: apiConfig.url,
  headers: {
    'content-type': 'application/json',
    'Authorization': apiConfig.token
  }
});


function createCard(data, cardSelector, popup, cardList) {
  const card = new Card(data, cardSelector, popup);
  const cardElement = card.generateCard();
  cardList.addElement(cardElement);
}


//добавление карточки
const addCardFormValidator = new FormValidator(validationConfig, formValidatorAddCard);
addCardFormValidator.enableValidation();

const popupAddCard = new PopupWithForm({
  selectorPopup: '.popup_add-card',
  handleSubmitForm: (formData) => {
    createCard(formData, cardSelector, popupWithImage.open.bind(popupWithImage))
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

const cardListApi = api.getCardList();

cardListApi.then((data) => {
  // debugger;
  const cardList = new Section({
    items: data,
    renderer: (item) => {
      createCard(item, cardSelector, popupWithImage.open.bind(popupWithImage), cardList)
    }
  }, cardContainerSelector);

  cardList.renderer();
})


