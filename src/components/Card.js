export default class Card {

  constructor (data, cardSelector, handleCardClick) {
    console.log(data);
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._showBigImage = handleCardClick;
    this._likes = data.likes;
    this._owner = data.owner;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.places__card').cloneNode(true);
    return cardElement;
  }

  _handlerLikeToggle() {
    this._like.classList.toggle('places__like_active');
  }

  _handlerRemoveCard() {
    this._el.remove();
    this._el = null;
  }

  _handleImageClick() {
    this._showBigImage(this._title, this._image);
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

  _isLike() {
    this._likes.find((element) => {
      if (window.localStorage.getItem('_id') === element._id) {
        return true;
      }
    });

    return false;
  }

  generateCard() {
    this._el = this._getTemplate();
    this._el.querySelector('.places__title').textContent = this._title;

    this._img = this._el.querySelector('.places__img');
    this._img.src = this._image;
    this._img.alt = this._title;

    this._like = this._el.querySelector('.places__like');

    this._el.querySelector('.places__like-count').textContent = this._likes.length;

    if (this._isLike()) {
      this._like.classList.add('places__like_active');
    }

    this._setEventListeners();

    return this._el;
  }
}
