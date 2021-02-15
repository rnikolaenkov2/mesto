export default class Card {

  constructor (cardSelector, {data, handlers}) {
    // handleCardClick, handleDeleteCard, hanldleAddLikeCard, hanldleDelLikeCard
    this._cardSelector = cardSelector;

    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._cardId = data._id;
    this._myId = window.localStorage.getItem('_id');

    this._showBigImage = handlers.handleCardClick;
    this._removeCard = handlers.handleDeleteCard;
    this._addLikeCard = handlers.hanldleAddLikeCard;
    this._delLikeCard = handlers.hanldleDelLikeCard;
    // this._likes = data.likes;
    // this._likes = data.likes;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.places__card').cloneNode(true);
    return cardElement;
  }

  _handlerLikeToggle() {
    if (this._like.classList.contains('places__like_active')) {
      this._delLikeCard(this._cardId);
    } else {
      this._addLikeCard(this._cardId);
    }
  }

  _handlerRemoveCard() {
    this._removeCard(this._cardId);
    // this._el.remove();
    // this._el = null;
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
    const res = this._likes.find((element) => {
      if (this._myId == element._id) {
        return true;
      }
    });

    if (res !== undefined) {
      return true;
    }

    return false;
  }

  _isMyCard() {
    if(this._myId === this._owner._id) {
      return true;
    }

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

    if (this._isMyCard()) {
      this._el.querySelector('.places__remove').classList.add('places__remove_visible');
    }

    this._setEventListeners();

    return this._el;
  }
}
