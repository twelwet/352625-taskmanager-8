// filter.js

import {downloaded} from './mock-data.js';
import {createElement} from './utils.js';

class Filter {
  constructor(data) {
    this._name = data.name;
    this._checked = data.checked;
    this._disabled = data.disabled;
    this._count = data.count;
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
    `;
  }

  render(container) {
    if (this._element) {
      container.removeChild(this._element);
      this._element = null;
    }
    this._element = createElement(this.template);
    container.appendChild(this._element);
  }

  unrender(container) {
    if (this._element) {
      container.removeChild(this._element);
      this._element = null;
    }
  }
}

const filters = downloaded.filters.map((item) => {
  item = new Filter(item);
  return item;
});

export default Filter;
