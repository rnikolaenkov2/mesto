let root = document.querySelector('.root');
let popup = root.querySelector('.popup');
let formElement = popup.querySelector('.popup__form');
let btnProfileChange = root.querySelector('.profile__btn-change');
let btnPopupClose = popup.querySelector('.popup__btn-close');

//открытие попапа
function openForm() {
  let nameInput = formElement.querySelector('.popup__input_func_name');
  let jobInput = formElement.querySelector('.popup__input_func_role');

  let name = root.querySelector('.profile__name');
  let job = root.querySelector('.profile__role');

  nameInput.value = name.textContent.trim();
  jobInput.value = job.textContent.trim();

  popup.classList.add('popup_opened');
}

//закрытие попапа
function closeForm() {
  popup.classList.remove('popup_opened');
}

btnProfileChange.addEventListener('click', openForm);
btnPopupClose.addEventListener('click', closeForm);

function formSubmitHandler (evt) {
  evt.preventDefault();

  // Находим поля формы в DOM
  let nameInput = formElement.querySelector('.popup__input_func_name');
  let jobInput = formElement.querySelector('.popup__input_func_role');
  // имя и роль на странице
  let name = root.querySelector('.profile__name');
  let job = root.querySelector('.profile__role');

   name.textContent = nameInput.value;
   job.textContent = jobInput.value;

   closeForm();
}

formElement.addEventListener('submit', formSubmitHandler);
