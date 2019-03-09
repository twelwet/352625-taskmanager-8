// task-edit.js

import {createElement} from './utils.js';
import taskTemplate from './task-template.js';

class TaskEdit {
  constructor(data) {
    this._label = data.label;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._isRepeat = data.isRepeat;
    this._isFavorite = data.isFavorite;
    this._isDone = data.isDone;
    this._isDeadline = data.isDeadline;

    this._element = null;
    this._state = {
      isEdit: true
    };

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  get element() {
    return this._element;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get template() {
    return taskTemplate(this);
  }

  bind() {
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick);
  }

  unbind() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick);
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

export default TaskEdit;
