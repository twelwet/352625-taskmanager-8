// filter.js

import {createElement} from './utils.js';

class Filter {
  constructor(data) {
    this._name = data.name;
    this._checked = data.checked;
    this._disabled = data.disabled;
    this._count = data.count;

    this._element = null;
  }

  get template() {
    return `
    <input
      type="radio"
      id="filter__${this._name}"
      class="filter__input visually-hidden"
      name="filter"
      ${this._checked ? `checked` : ``} ${this._disabled ? `disabled` : ``}
    />
    <label for="filter__${this._name}" class="filter__label"
      >${this._name} <span class="filter__archive-count">${this._count}</span></label>
    `.trim();
  }

  bind() {
    // Добавление обработчиков
  }

  unbind() {
    // Удаление обработчиков
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}

export default Filter;
