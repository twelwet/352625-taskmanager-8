// stat.js

import {downloaded, WEEK} from './mock-data.js';
import activateTagsStat from './stat-tags.js';
import activateColorsStat from './stat-colors.js';
import moment from 'moment';
import flatpickr from 'flatpickr';

const taskBoard = document.querySelector(`.board`);
const statContainer = document.querySelector(`.statistic`);

const tasksButton = document.querySelector(`#control__task`);
const statButton = document.querySelector(`#control__statistic`);

const showTaskBoard = () => taskBoard.classList.remove(`visually-hidden`);
const hideTaskBoard = () => taskBoard.classList.add(`visually-hidden`);

const showStat = () => statContainer.classList.remove(`visually-hidden`);
const hideStat = () => statContainer.classList.add(`visually-hidden`);

statButton.addEventListener(`click`, () => {
  hideTaskBoard();
  showStat();
  console.log(downloaded.tasks.filter((it) => it.isDone === true));
  activateTagsStat();
  activateColorsStat();
});

tasksButton.addEventListener(`click`, () => {
  hideStat();
  showTaskBoard();
});

const statPeriod = statContainer.querySelector(`.statistic__period-input`);

const getDate = () => {
  const now = Date.now();
  return {
    now: moment(now).format(`D MMMM`),
    plusWeek: moment(now).add(WEEK).format(`D MMMM`)
  };
};

flatpickr(statPeriod, {
  mode: `range`,
  altInput: true, altFormat: `j F`,
  dateFormat: `j F`,
  defaultDate: [getDate().now, getDate().plusWeek]
});

// export {tagsChart, colorsChart};
