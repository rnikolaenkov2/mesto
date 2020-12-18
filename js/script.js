const root = document.querySelector('.root');
const places = root.querySelector('.places');
const cardTemplate = root.querySelector('#card').content;

const name = root.querySelector('.profile__name');
const job = root.querySelector('.profile__role');

const popupEditProfile = root.querySelector('.popup_edit-profile');
const popupAddCard = root.querySelector('.popup_add-card');
const popupPhoto = root.querySelector('.popup_theme_photo');
const btnProfileChange = root.querySelector('.profile__btn-change');
const btnPopupCloseList = root.querySelectorAll('.popup__btn-close');
const btnAddCard = root.querySelector('.profile__btn-add-img');

const formEditProfile = popupEditProfile.querySelector('.popup__form');
const profileName = formEditProfile.querySelector('.popup__input_func_name');
const profileJob = formEditProfile.querySelector('.popup__input_func_role');

const formAddCard = popupAddCard.querySelector('.popup__form');
const cardName = formAddCard.querySelector('.popup__input_name');
const cardLink = formAddCard.querySelector('.popup__input_link');

const popupList = Array.from(root.querySelectorAll('.popup'));

popupList.forEach((popupEl) => {
  popupEl.addEventListener('click', (e) => {
    e.stopPropagation();
    const el = e.target;
    if(el.classList.contains('popup')) {
      Array.from(btnPopupCloseList).forEach((btnPopupCloseEl) => {
        btnPopupCloseEl.click();
      });
    }
  })
});

init(initialCards);

//инициализация карточек
function init(cards) {
  cards.forEach((card) => {
    let cardElement = createCard(cardTemplate, card.name, card.link);
    addCard(cardElement);
  });
}

function createCard(cardTemplate, name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const img = cardElement.querySelector('.places__img');
  const like = cardElement.querySelector('.places__like');

  img.setAttribute('src', link);
  img.setAttribute('alt', name);
  cardElement.querySelector('.places__title').textContent = name;

  cardElement.querySelector('.places__remove').addEventListener('click', (event) => {
    deleteCard(event.target.closest('.places__card'));
  });

  like.addEventListener('click', (event) => {
    toggleLike(event.target);
  });

  img.addEventListener('click', () => {
    const img = popupPhoto.querySelector('.popup__photo');
    img.setAttribute('src', link);
    img.setAttribute('alt', name);
    popupPhoto.querySelector('.popup__title').textContent = name;
    openForm(popupPhoto);
  });

  return cardElement;
}

function addCard(cardElement) {
  places.prepend(cardElement);
}

function deleteCard(element) {
  element.remove();
}

function toggleLike(element) {
  element.classList.toggle('places__like_active');
}

//открытие попапа
function openForm(popup) {
  popup.classList.add('popup_opened');
}

function setInputEditProfileForm() {
  profileName.value = name.textContent.trim();
  profileJob.value = job.textContent.trim();

  // isValid(formEditProfile, profileName);
  // isValid(formEditProfile, profileJob);
  toggleButtonState([profileName, profileJob], formEditProfile.querySelector('.popup__btn-save'), config);
}

//закрытие попапа
function closeForm(popup) {
  popup.classList.remove('popup_opened');
}

function clearInputInPopup(popup) {
  //const form = popup.querySelector('.popup__form');
  // form.reset();
  let inputs = popup.querySelectorAll('.popup__input');
  inputs.forEach((input) => {
    input.value = '';
  });
}

function formEditProfileSubmitHandler(evt) {
  //evt.preventDefault();

  name.textContent = profileName.value;
  job.textContent = profileJob.value;

  closeForm(popupEditProfile);
}

function formAddCardSubmitHandler(evt) {
  //evt.preventDefault();
  let name = 'No name';
  let link = './images/no-image.jpg';
  if (cardName.value !== '') {
    name = cardName.value;
  }

  if (cardLink.value !== '') {
    link = cardLink.value;
  }

  const cardElement = createCard(cardTemplate, name, link);
  addCard(cardElement);
  clearInputInPopup(popupAddCard);
  closeForm(popupAddCard);
}

btnProfileChange.addEventListener('click', () => {
  setInputEditProfileForm(popupEditProfile)

  openForm(popupEditProfile);
});

btnPopupCloseList.forEach((item) => {

  item.addEventListener('click', (evt) => {
    let el = evt.target.closest('.popup')
    if (!el.classList.contains('popup popup_theme_photo')) {
      clearInputInPopup(el);
    }
    closeForm(el);
  });
});

popupEditProfile.addEventListener('submit', formEditProfileSubmitHandler);

btnAddCard.addEventListener('click', () => {
  openForm(popupAddCard);
  // isValid(formAddCard, cardName);
  // isValid(formAddCard, cardLink);
  toggleButtonState([cardName, cardLink], formAddCard.querySelector('.popup__btn-save'), config);
});

popupAddCard.addEventListener('submit', formAddCardSubmitHandler);



root.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    Array.from(btnPopupCloseList).forEach((btnPopupCloseEl) => {
      btnPopupCloseEl.click();
    });
  }
})
