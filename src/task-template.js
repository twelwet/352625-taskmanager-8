// task-template.js

import {COLORS} from './mock-data.js';

const taskTemplate = (data) => `
<article class="card card--${data._color} ${data._isDeadline ? `card--deadline` : ``} ${data._isRepeat ? `card--repeat` : ``} ${data._state.isEdit ? `card--edit` : ``}">
  <form class="card__form" method="get">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--edit">
          edit
        </button>
        <button type="button" class="card__btn card__btn--archive">
          archive
        </button>
        <button
          type="button"
          class="card__btn card__btn--favorites card__btn--disabled">
          favorites
        </button>
      </div>
      <div class="card__color-bar">
        <svg class="card__color-bar-wave" width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>
      <div class="card__textarea-wrap">
        <label>
          <textarea
            class="card__text"
            placeholder="Start typing your text here..."
            name="text"
          >${data._label}</textarea>
        </label>
      </div>
      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">no</span>
            </button>
            <fieldset class="card__date-deadline">
              <label class="card__input-deadline-wrap">
                <input
                  class="card__date"
                  type="text"
                  placeholder="23 September"
                  name="date"
                  value="${data._dueDate.date} ${data._dueDate.month}"
                />
              </label>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__time"
                  type="text"
                  placeholder="11:15 PM"
                  name="time"
                  value="${data._dueDate.hours}:${data._dueDate.minutes}"
                />
              </label>
            </fieldset>
            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">${data._isRepeat ? `yes` : `no`}</span>
            </button>
            <fieldset class="card__repeat-days">
              <div class="card__repeat-days-inner">
              ${(Array.from(data._repeatingDays).map(([day, value]) => (`
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-${day}-1"
                  name="repeat"
                  value="${day}"
                  ${value ? `checked` : ``}/>
                <label class="card__repeat-day" for="repeat-${day}-1">${day}
                </label>`.trim()))).join(``)}
              </div>
            </fieldset>
          </div>
          <div class="card__hashtag">
            <div class="card__hashtag-list">
            ${(Array.from(data._tags).map((tag) => (`
              <span class="card__hashtag-inner">
              <input type="hidden" name="hashtag" value="${tag}" class="card__hashtag-hidden-input" />
              <button type="button" class="card__hashtag-name">#${tag}</button>
              <button type="button" class="card__hashtag-delete">delete</button>
              </span>`.trim()))).join(``)}
            </div>
            <label>
              <input
                type="text"
                class="card__hashtag-input"
                name="hashtag-input"
                placeholder="Type new hashtag here"
              />
            </label>
          </div>
        </div>
        <label class="card__img-wrap">
          <input
            type="file"
            class="card__img-input visually-hidden"
            name="img"
          />
          <img
            src="${data._picture}"
            alt="task picture"
            class="card__img"
          />
        </label>
        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
            ${(Array.from(COLORS).map((color) => (`
              <input
                type="radio"
                id="color-${color}-1"
                class="card__color-input card__color-input--${color} visually-hidden"
                name="color"
                value="${color}"
                ${(color === `black`) ? `checked` : ``}
              />
              <label
                for="color-${color}-1"
                class="card__color card__color--${color}">${color}</label>`.trim()))).join(``)}
          </div>
        </div>
      </div>
      <div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>
    </div>
  </form>
</article>`.trim();

export default taskTemplate;