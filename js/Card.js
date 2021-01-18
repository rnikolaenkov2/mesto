export default class Card {

  constructor (data, cardSelector, popupBigImage, showPopup) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;

    this._popupBigImage = popupBigImage;
    this._showPopup = showPopup;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.places__card').cloneNode(true);
    return cardElement;
  }

  _handlerLikeToggle() {
    this._like.classList.toggle('places__like_active');
  }

  _handlerRemoveCard() {
    this._removeCard(this._el);
  }

  _handleImageClick() {
    const img = this._popupBigImage.querySelector('.popup__photo');
    img.setAttribute('src', this._image);
    img.setAttribute('alt', this._title);
    this._popupBigImage.querySelector('.popup__title').textContent = this._title;
    this._showPopup(this._popupBigImage);
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._handlerLikeToggle();
    });

    this._el.querySelector('.places__remove').addEventListener('click', () => {
      this._handlerRemoveCard();
    });

    this._img.addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  generateCard() {
    this._el = this._getTemplate();
    this._el.querySelector('.places__title').textContent = this._title;

    this._img = this._el.querySelector('.places__img');
    this._img.src = this._image;
    this._img.alt = this._title;

    this._like = this._el.querySelector('.places__like');

    this._setEventListeners();

    return this._el;
  }
}
