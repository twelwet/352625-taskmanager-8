// task-edit.js

import Component from './component.js';
import taskTemplate from './task-template.js';
import flatpickr from 'flatpickr';
import moment from 'moment';

class TaskEdit extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._label = data.label;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._isDone = data.isDone;
    this._isFavorite = data.isFavorite;

    this._state = {
      isEdit: true,
      isDate: true,
      isRepeated: this._isRepeated(),
      isDeadline: this._isDeadline()
    };

    this._onFavoritesButtonClick = this._onFavoritesButtonClick.bind(this);
    this._onArchiveButtonClick = this._onArchiveButtonClick.bind(this);

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);

    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);

    this._onDelete = null;
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  _onFavoritesButtonClick() {
    this._isFavorite = !this._isFavorite;

    this.removeListeners();
    this._partialUpdate();
    this.createListeners();
  }

  _onArchiveButtonClick() {
    this._isDone = !this._isDone;

    this.removeListeners();
    this._partialUpdate();
    this.createListeners();
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _isDeadline() {
    return moment(this._dueDate) < moment();
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = TaskEdit.processForm(formData);

    newData.isDone = this._isDone;
    newData.isFavorite = this._isFavorite;

    if (moment(newData.date).unix() > 0) {
      newData.dueDate = moment(`${newData.date} ${newData.time}`, `D MMMM h:mm A`).unix() * 1000; // s => ms
    } else {
      newData.dueDate = null;
    }

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;

    if (!this._state.isDate) {
      this._dueDate = null;
    }

    this.removeListeners();
    this._partialUpdate();
    this.createListeners();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;

    this.removeListeners();
    this._partialUpdate();
    this.createListeners();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _onDeleteButtonClick() {
    if (typeof this._onDelete === `function`) {
      this._onDelete();
    }
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  get template() {
    return taskTemplate(this);
  }

  createListeners() {
    this._element.querySelector(`.card__btn--archive`).addEventListener(`click`, this._onArchiveButtonClick);
    this._element.querySelector(`.card__btn--favorites`).addEventListener(`click`, this._onFavoritesButtonClick);
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__delete`).addEventListener(`click`, this._onDeleteButtonClick);

    if (this._state.isDate) {
      console.log(`Flatpickr!`)
      flatpickr(`.card__date`, {
        altInput: true, altFormat: `j F`,
        dateFormat: `j F`
      });
      flatpickr(`.card__time`, {
        enableTime: true,
        noCalendar: true,
        altInput: true,
        altFormat: `h:i K`,
        dateFormat: `h:i K`
      });
    }

  }

  removeListeners() {
    this._element.querySelector(`.card__btn--archive`).removeEventListener(`click`, this._onArchiveButtonClick);
    this._element.querySelector(`.card__btn--favorites`).removeEventListener(`click`, this._onFavoritesButtonClick);
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__delete`).removeEventListener(`click`, this._onDeleteButtonClick);
  }

  update(data) {
    this._label = data.label;
    this._color = data.color;

    this._dueDate = data.dueDate;
    console.log(this._dueDate);
    console.log(this._state.isDate);
    if (this._dueDate === null && this._state.isDate === true) {
      this._state.isDate = false;
    }

    this._repeatingDays = data.repeatingDays;
    this._isDone = data.isDone;
    this._isFavorite = data.isFavorite;
    this._state.isRepeated = this._isRepeated();
  }

  static processForm(formData) {
    const entry = {
      label: ``,
      color: ``,
      repeatingDays: {
        mo: false,
        tu: false,
        we: false,
        th: false,
        fr: false,
        sa: false,
        su: false
      },
      date: ``,
      time: ``
    };

    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }
    console.log(`Date: ${entry.date}`)
    console.log(`Time: ${entry.time}`)
    return entry;
  }

  static createMapper(target) {
    return {
      text: (value) => {
        target.label = value;
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays[value] = true;
      },
      date: (value) => {
        target.date = value;
      },
      time: (value) => {
        target.time = value;
      }
    };
  }

}

export default TaskEdit;
