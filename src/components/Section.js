export default class Section {
  constructor(containerSelector, renderer) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  setElement(element) {
    this._container.append(element);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderer(items) {
    this._clear();

    items.forEach(item => {
      this._renderer(item);
    });
  }

  addElement(element) {
    this._container.prepend(element);
  }
}
