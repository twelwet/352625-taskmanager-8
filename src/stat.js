// stat.js

import {downloaded, WEEK} from './mock-data.js';
import {getTagsStat, getTagsChart} from './stat-tags.js';
import {getColorsStat, getColorsChart} from './stat-colors.js';
import moment from 'moment';
import flatpickr from 'flatpickr';

const taskBoard = document.querySelector(`.board`);
const statContainer = document.querySelector(`.statistic`);

const tagsWrap = document.querySelector(`.statistic__tags-wrap`);
const tagsCtx = tagsWrap.querySelector(`.statistic__tags`);

const colorsWrap = document.querySelector(`.statistic__colors-wrap`);
const colorsCtx = colorsWrap.querySelector(`.statistic__colors`);
colorsWrap.classList.remove(`visually-hidden`);

// один раз инициализируем Chart, дальше с ним работаем, в функциях он доступен через замыкание
const tagsChart = getTagsChart(tagsCtx);
const colorsChart = getColorsChart(colorsCtx);

const showTaskBoard = () => taskBoard.classList.remove(`visually-hidden`);
const hideTaskBoard = () => taskBoard.classList.add(`visually-hidden`);

const showStat = () => statContainer.classList.remove(`visually-hidden`);
const hideStat = () => statContainer.classList.add(`visually-hidden`);

const activateTagsStat = () => {
  tagsWrap.classList.remove(`visually-hidden`);
  const {quantites, names} = getTagsStat(downloaded.tasks);
  tagsChart.data.datasets[0].data = quantites;
  tagsChart.data.labels = names;

  tagsChart.update();
};

const activateColorsStat = () => {
  const {quantites, colors} = getColorsStat(downloaded.tasks);
  colorsChart.data.datasets[0].data = quantites;
  colorsChart.data.datasets[0].backgroundColor = colors;
  colorsChart.data.labels = colors;

  colorsChart.update();
};

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

export {showTaskBoard, hideTaskBoard, showStat, hideStat, activateTagsStat, activateColorsStat};
