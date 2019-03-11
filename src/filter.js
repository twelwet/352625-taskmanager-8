// filter.js

import Component from './component.js';

class Filter extends Component {
  constructor(data) {
    super();
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
    `.trim();
  }
}

export default Filter;
