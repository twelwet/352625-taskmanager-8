// task-edit.js

import Component from './component.js';
import taskTemplate from './task-template.js';
import flatpickr from 'flatpickr';

class TaskEdit extends Component {
  constructor(data) {
    super();
    this._label = data.label;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._isFavorite = data.isFavorite;
    this._isDone = data.isDone;
    this._isDeadline = data.isDeadline;

    this._state.isEdit = true;
    this._state.isDate = true;
    this._state.isRepeated = this._isRepeated();

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);

    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = TaskEdit.processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    if (!this._state.isDate) {
      this._dueDate.date = ``;
      this._dueDate.time = ``;
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

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get template() {
    return taskTemplate(this);
  }

  createListeners() {
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onChangeRepeated);

    if (this._state.isDate) {
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
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onChangeRepeated);

  }

  update(data) {
    this._label = data.label;
    this._color = data.color;
    this._dueDate = data.dueDate;

    if (this._dueDate.date === `` && this._dueDate.time === `` && this._state.isDate === true) {
      this._state.isDate = false;
    }

    this._repeatingDays = data.repeatingDays;
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
      dueDate: {
        date: ``,
        time: ``
      }
    };

    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

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
        target.dueDate.date = value;
      },
      time: (value) => {
        target.dueDate.time = value;
      }
    };
  }

}

export default TaskEdit;
