export default class Popup {
  constructor(selectorPopup) {
    console.log(selectorPopup);
    this._popup = document.querySelector(selectorPopup);
    this._closePopupBtn = this._popup.querySelector('.popup__btn-close');
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    document.querySelector('.root').removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  _handleClose() {
    this.close();
  }

  setEventListeners() {
    this._closePopupBtn.addEventListener('click', () => {
      this._handleClose();
    });
    document.querySelector('.root').addEventListener('keydown', this._handleEscClose);
  }


}
