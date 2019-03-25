// task-template.js

import {COLORS} from './mock-data.js';
import moment from 'moment';

const taskTemplate = (data) => `
<article class="card card--${data._color} ${data._state.isDeadline ? `card--deadline` : ``} ${data._state.isRepeated ? `card--repeat` : ``} ${data._state.isEdit ? `card--edit` : ``}">
  <form class="card__form" method="get">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--edit">
          edit
        </button>
        <button type="button" class="card__btn card__btn--archive ${data._state.isArchive ? `` : `card__btn--disabled`}">
          archive
        </button>
        <button
          type="button"
          class="card__btn card__btn--favorites ${data._state.isFavorite ? `` : `card__btn--disabled`}">
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
              date: <span class="card__date-status">${data._state.isDate ? `yes` : `no`}</span>
            </button>
            <fieldset class="card__date-deadline" ${data._state.isDate ? `` : `disabled`}>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__date"
                  type="text"
                  placeholder="23 September"
                  name="date"
                  value="${moment(data._dueDate).format(`D MMMM`)}"
                  required
                />
              </label>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__time"
                  type="text"
                  placeholder="11:15 PM"
                  name="time"
                  value="${moment(data._dueDate).format(`h:mm A`)}"
                />
              </label>
            </fieldset>
            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">${data._state.isRepeated ? `yes` : `no`}</span>
            </button>
            <fieldset class="card__repeat-days" ${!data._state.isRepeated && `disabled`}>
            <div class="card__repeat-days-inner">
              <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-mo-${data._id}" name="repeat" value="mo" ${data._repeatingDays.mo && `checked`}/>
              <label class="card__repeat-day" for="repeat-mo-${data._id}">mo</label>
              <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-tu-${data._id}" name="repeat" value="tu" ${data._repeatingDays.tu && `checked`}/>
              <label class="card__repeat-day" for="repeat-tu-${data._id}">tu</label>
              <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-we-${data._id}" name="repeat" value="we" ${data._repeatingDays.we && `checked`}/>
              <label class="card__repeat-day" for="repeat-we-${data._id}">we</label>
              <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-th-${data._id}" name="repeat" value="th" ${data._repeatingDays.th && `checked`}/>
              <label class="card__repeat-day" for="repeat-th-${data._id}">th</label>
              <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-fr-${data._id}" name="repeat" value="fr" ${data._repeatingDays.fr && `checked`}/>
              <label class="card__repeat-day" for="repeat-fr-${data._id}">fr</label>
              <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-sa-${data._id}" name="repeat" value="sa" ${data._repeatingDays.sa && `checked`}/>
              <label class="card__repeat-day" for="repeat-sa-${data._id}">sa</label>
              <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-su-${data._id}" name="repeat" value="su" ${data._repeatingDays.su && `checked`}/>
              <label class="card__repeat-day" for="repeat-su-${data._id}">su</label>
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
                id="color-${color}-${data._id}"
                class="card__color-input card__color-input--${color} visually-hidden"
                name="color"
                value="${color}"
                ${(color === data._color) ? `checked` : ``}
              />
              <label
                for="color-${color}-${data._id}"
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
