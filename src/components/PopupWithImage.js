import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {

    super(selectorPopup);

    this._image = this._popup.querySelector('.popup__photo');
    this._text = this._popup.querySelector('.popup__title');
  }

  open(name, link) {
    console.log(this);
    this._image.setAttribute('src', link);
    this._image.setAttribute('alt', name);
    this._text.textContent = name;
    super.open();
  }
}
