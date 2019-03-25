// task.js

import Component from './component.js';
import taskTemplate from './task-template.js';
import moment from 'moment';

class Task extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._label = data.label;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._isFavorite = data.isFavorite;
    this._isArchive = data.isArchive;
    this._isDone = data.isDone;

    this._state = {
      isEdit: false,
      isArchive: data.isArchive,
      isFavorite: data.isFavorite,
      isDate: true,
      isRepeated: this._isRepeated(),
      isDeadline: this._isDeadline()
    };

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _isDeadline() {
    return moment(this._dueDate) < moment();
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return taskTemplate(this);
  }

  createListeners() {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditButtonClick);
  }

  removeListeners() {
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._label = data.label;
    this._color = data.color;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;
    this._state.isRepeated = this._isRepeated();
    this._state.isArchive = data.isArchive;
    this._state.isFavorite = data.isFavorite;
  }
}

export default Task;
