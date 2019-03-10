// task-edit.js

import Component from './component.js';
import taskTemplate from './task-template.js';

class TaskEdit extends Component {
  constructor(data) {
    super();
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

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get template() {
    return taskTemplate(this);
  }

  createListeners() {
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick);
  }

  removeListeners() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick);
  }
}

export default TaskEdit;
