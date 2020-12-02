const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const root = document.querySelector('.root');
const popup = root.querySelector('.popup');
const formElement = popup.querySelector('.popup__form');
const btnProfileChange = root.querySelector('.profile__btn-change');
const btnPopupClose = popup.querySelector('.popup__btn-close');
const nameInput = formElement.querySelector('.popup__input_func_name');
const jobInput = formElement.querySelector('.popup__input_func_role');
const name = root.querySelector('.profile__name');
const job = root.querySelector('.profile__role');
const cardTemplate = root.querySelector('#card').content;
const places = root.querySelector('.places');



init(initialCards);

//инициализация карточек
function init(cards) {
  cards.forEach((card) => {
    let cardElement = cardTemplate.cloneNode(true);
    console.log(cardElement.querySelector('.places__img'));
    cardElement.querySelector('.places__img').setAttribute('src', card.link);
    cardElement.querySelector('.places__title').textContent = card.name;
    places.prepend(cardElement);
  });
}

//открытие попапа
function openForm() {
  nameInput.value = name.textContent.trim();
  jobInput.value = job.textContent.trim();

  popup.classList.add('popup_opened');
}

//закрытие попапа
function closeForm() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

   name.textContent = nameInput.value;
   job.textContent = jobInput.value;

   closeForm();
}

btnProfileChange.addEventListener('click', openForm);
btnPopupClose.addEventListener('click', closeForm);
formElement.addEventListener('submit', formSubmitHandler);
