export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._closePopupBtn = this._popup.querySelector('.popup__btn-close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickWithoutClose = this._handleClickWithoutClose.bind(this);
    this._submit = this._popup.querySelector('.popup__btn-save');
  }

  renderLoadingText(text) {
    this._submit.textContent = text;
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  _handleClickWithoutClose(e) {
    e.stopPropagation();
    if(e.target.classList.contains('popup')){
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    window.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  _handleClose() {
    this.close();
  }

  setEventListeners() {
    this._closePopupBtn.addEventListener('click', () => {
      this._handleClose();
    });

    this._popup.addEventListener('click', this._handleClickWithoutClose);
  }
}
