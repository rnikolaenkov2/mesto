import './index.css';

import Section from '../components/Section.js';
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

const storage = window.localStorage;

const formValidatorAddCard = document.querySelector('.popup_add-card').querySelector('.popup__form');
const btnAddCard = document.querySelector('.profile__btn-add-img');
const formValidatorEditProfile = document.querySelector('.popup_edit-profile').querySelector('.popup__form');
const btnProfileChange = document.querySelector('.profile__btn-change');
const formAvatarUpload = document.querySelector('.popup_upload-avatar').querySelector('.popup__form');

let cardToDelete;
let elementToDelete;

const api = new Api({
  url: apiConfig.url,
  headers: {
    'content-type': 'application/json',
    'Authorization': apiConfig.token
  }
});

function handleRemoveCard(cardId, element) {
  cardToDelete = cardId;
  elementToDelete = element;
  popupDelCard.open();
}

function hanldleAddLikeCard(cardId, thisCard) {
  api.addLike(cardId)
    .then((res) => {
      thisCard.updateLikeCount(res.likes.length);
      thisCard.isLike(res.likes);
      return res;
    })
    .catch((res) => {
      console.log(res);
    });
}

function hanldleDelLikeCard(cardId, thisCard) {
  api.deleteLike(cardId)
    .then((res) => {
      thisCard.updateLikeCount(res.likes.length);
      thisCard.isLike(res.likes);
      return res;
    })
    .catch((res) => {
      console.log(res);
    });
}

function createCard(data, cardSelector, popup, cardList) {
  const handlers = {
    'handleCardClick': popup,
    'handleDeleteCard': handleRemoveCard,
    'hanldleAddLikeCard': hanldleAddLikeCard,
    'hanldleDelLikeCard': hanldleDelLikeCard
  };

  const card = new Card(cardSelector, { data, handlers});
  const cardElement = card.generateCard();
  cardList.addElement(cardElement);
}


//добавление карточки
const addCardFormValidator = new FormValidator(validationConfig, formValidatorAddCard);
addCardFormValidator.enableValidation();

const popupAddCard = new PopupWithForm({
  selectorPopup: '.popup_add-card',
  handleSubmitForm: (formData) => {
    popupAddCard.renderLoadingText('Сохранение...');
    api.addCard(formData.name, formData.link)
      .then((res) => {
        createCard(res, cardSelector, popupWithImage.open.bind(popupWithImage), cardList);
      })
      .catch((res) => {
        console.log(res);
      })
      .finally(() => {
        popupAddCard.renderLoadingText('Сохранить');
      })
  }
});

popupAddCard.setEventListeners();
btnAddCard.addEventListener('click', () => {
  addCardFormValidator.clearErrors();
  popupAddCard.open();
});

//удаление карточки
const popupDelCard =new PopupWithForm({
  selectorPopup: '.popup_delete-card',
  handleSubmitForm:() => {
    popupDelCard.renderLoadingText('Сохранение...');
    api.deleteCard(cardToDelete)
    .then((res) => {
      elementToDelete.remove();
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      popupDelCard.renderLoadingText('Да');
    });
  }
});

popupDelCard.setEventListeners();

//редактирование профиля
const editProfileFormValidator = new FormValidator(validationConfig, formValidatorEditProfile);
editProfileFormValidator.enableValidation();

const userInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorRole: '.profile__role',
  selectorAva: '.profile__avatar'
});

const userInfoApi = api.getProfile();
userInfoApi
  .then((data) => {
    storage.setItem('_id', data._id);
    return data;
  })
  .then((data) => {
    userInfo.setUserInfo(data);
  })
  .catch((res) => {
    console.log(res);
  });

const popupEditProfile = new PopupWithForm({
  selectorPopup: '.popup_edit-profile',
  handleSubmitForm: (formData) => {
    popupEditProfile.renderLoadingText('Сохранение...');
    api.editProfile(formData.name, formData.about)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((res) => {
        console.log(res);
      })
      .finally(() => {
        popupEditProfile.renderLoadingText('Сохранить');
      });
  }
});

popupEditProfile.setEventListeners();
btnProfileChange.addEventListener('click', () => {
  editProfileFormValidator.clearErrors();
  const userInfoData = userInfo.getUserInfo();
  popupEditProfile.addData(userInfoData);
  popupEditProfile.open()
});

//обновление аватарки
const uploadAvatarFormValidator = new FormValidator(validationConfig, formAvatarUpload );
uploadAvatarFormValidator.enableValidation();

const popupUploadAvatar = new PopupWithForm({
  selectorPopup: '.popup_upload-avatar',
  handleSubmitForm:(formData) => {
    popupUploadAvatar.renderLoadingText('Сохранение...');
    api.editAvatar(formData.link)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((res) => {
        console.log(res);

      })
      .finally(() => {
        popupUploadAvatar.renderLoadingText('Сохранить');
      });
  }
});

popupUploadAvatar.setEventListeners();
document.querySelector('.profile__avatar-upload').addEventListener('click', () => {
  uploadAvatarFormValidator.clearErrors();
  popupUploadAvatar.open();
})

//рендер карточек
const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

const cardListApi = api.getCardList();
const cardList = new Section(cardContainerSelector, function(item) {
  createCard(item, cardSelector, popupWithImage.open.bind(popupWithImage), cardList);
});

cardListApi
  .then((data) => {
    cardList.renderer(data);
  })
  .catch((res) => {
    console.log(res);
  });

