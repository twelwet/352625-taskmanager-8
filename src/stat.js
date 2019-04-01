// stat.js

import {downloaded, WEEK} from './mock-data.js';
import {getTagsStat, getTagsChart, tagsWrap} from './stat-tags.js';
import {getColorsStat, getColorsChart, colorsWrap} from './stat-colors.js';
import moment from 'moment';
import flatpickr from 'flatpickr';

const taskBoard = document.querySelector(`.board`);
const statContainer = document.querySelector(`.statistic`);

const showTaskBoard = () => taskBoard.classList.remove(`visually-hidden`);
const hideTaskBoard = () => taskBoard.classList.add(`visually-hidden`);

const showStat = () => statContainer.classList.remove(`visually-hidden`);
const hideStat = () => statContainer.classList.add(`visually-hidden`);

const activateTagsStat = () => {
  tagsWrap.classList.remove(`visually-hidden`);

  const tagsChart = getTagsChart();
  tagsChart.data.datasets[0].data = getTagsStat(downloaded.tasks).quantites;
  tagsChart.data.labels = getTagsStat(downloaded.tasks).names;

  tagsChart.update();
};

const activateColorsStat = () => {
  colorsWrap.classList.remove(`visually-hidden`);

  const colorsChart = getColorsChart();
  colorsChart.data.datasets[0].data = getColorsStat(downloaded.tasks).quantites;
  colorsChart.data.datasets[0].backgroundColor = getColorsStat(downloaded.tasks).colors;
  colorsChart.data.labels = getColorsStat(downloaded.tasks).colors;

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
