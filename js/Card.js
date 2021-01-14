export default class Card {

  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    if (data.isLike === undefined) {
      this._isLike = false;
    } else {
      this._isLike = data.isLike;
    }
    this._cardSelector = cardSelector;
    this._popupBigImage = document.querySelector('.popup_theme_photo');
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.places__card').cloneNode(true);
    return cardElement;
  }

  _showBigImage() {
    this._popupBigImage.classList.add('popup_opened');

    this._popupBigImage.closest('.root').addEventListener('keydown', this._handleClosePopupByEsc, {once: true});
  }

  _generateBigImage() {
    const img = this._popupBigImage.querySelector('.popup__photo');
    img.setAttribute('src', this._image);
    img.setAttribute('alt', this._title);
    this._popupBigImage.querySelector('.popup__title_theme_photo').textContent = this._title;
  }

  _closeBigImage() {
    this._el.classList.remove('popup_opened');
    this._popupBigImage.closest('.root').removeEventListener('keydown', this._handleClosePopupByEsc);
  }

  _handleLikeClick() {
    this._isLike = !this._isLike;
    this._like.classList.toggle('places__like_active');
  }

  _handleRemoveClick() {
    this._el.remove();
  }

  _handleImageClick() {
    console.log(this);
    this._generateBigImage();
    this._showBigImage();
  }

  _handleClosePopupByEsc(e) {
    if (e.key === 'Escape') {
     const popup = this.querySelector('.popup_theme_photo').classList.remove('popup_opened');
    }
  }

  _handleCloseClick() {
    this._closeBigImage();
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._el.querySelector('.places__remove').addEventListener('click', () => {
      this._handleRemoveClick();
    });

    this._el.querySelector('.places__img').addEventListener('click', () => {
      this._handleImageClick();
    });

    this._popupBigImage.querySelector('.popup__btn-close').addEventListener('click', () => {
      this._handleCloseClick();
    });

    this._popupBigImage.closest('.popup').addEventListener('click', (e) => {
      e.stopPropagation();
      const el = e.target;
      if(el.classList.contains('popup')) {
        this._closeBigImage();
      }

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
