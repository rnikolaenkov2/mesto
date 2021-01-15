export default class Card {

  constructor (data, cardSelector, func) {
    this._title = data.name;
    this._image = data.link;
    if (data.isLike === undefined) {
      this._isLike = false;
    } else {
      this._isLike = data.isLike;
    }
    this._cardSelector = cardSelector;

    this._renderBigImage = func.renderBigImage;
    this._showBigImage = func.showBigImage;
    this._removeCard = func.removeCard;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.places__card').cloneNode(true);
    return cardElement;
  }

  _handlerLikeToggle() {
    this._isLike = !this._isLike;
    this._like.classList.toggle('places__like_active');
  }

  _handlerRemoveCard() {
    this._removeCard(this._el);
  }

  _handleImageClick() {
    this._renderBigImage({'link' : this._image, 'title' : this._title});
    this._showBigImage();
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._handlerLikeToggle();
    });

    this._el.querySelector('.places__remove').addEventListener('click', () => {
      this._handlerRemoveCard();
    });

    this._el.querySelector('.places__img').addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  generateCard() {
    this._el = this._getTemplate();
    this._el.querySelector('.places__title').textContent = this._title;
    this._el.querySelector('.places__img').src = this._image;
    this._el.querySelector('.places__img').alt = this._title;

    this._like = this._el.querySelector('.places__like');
    if (this._isLike) {
      this._like.classList.add('places__like_active');
    }

    this._setEventListeners();

    return this._el;
  }
}
