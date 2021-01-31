export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setElement(element) {
    this._container.append(element);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderer() {
    this._clear();

    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  addElement(element) {
    this._container.prepend(element);
  }
}
