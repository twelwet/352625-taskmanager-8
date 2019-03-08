// mock-data.js

import {getRandomInteger} from './utils.js';

const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
const LABELS = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const MONTHS = [`january`, `february`, `march`, `april`, `may`, `june`, `july`, `august`, `september`, `october`, `november`, `december`];
const WEEK = 604800000; // ms
const ALL_HASHTAGS = [`homework`, `theory`, `practice`, `intensive`, `keks`];

const getRandomIndex = (arr) => {
  return getRandomInteger(0, arr.length - 1);
};

const filters = [
  {
    name: `all`,
    checked: true,
    disabled: false,
    count: getRandomInteger(1, 100)
  },
  {
    name: `overdue`,
    checked: false,
    disabled: true,
    count: getRandomInteger(1, 100)
  },
  {
    name: `today`,
    checked: false,
    disabled: true,
    count: getRandomInteger(1, 100)
  },
  {
    name: `favorites`,
    checked: false,
    disabled: false,
    count: getRandomInteger(1, 100)
  },
  {
    name: `repeating`,
    checked: false,
    disabled: false,
    count: getRandomInteger(1, 100)
  },
  {
    name: `tags`,
    checked: false,
    disabled: false,
    count: getRandomInteger(1, 100)
  },
  {
    name: `archive`,
    checked: false,
    disabled: false,
    count: getRandomInteger(1, 100)
  },
];

const getRandomDate = () => {
  const randomDate = new Date(Date.now() + getRandomInteger(-WEEK, WEEK));
  return {
    date: randomDate.getDate(),
    month: MONTHS[randomDate.getMonth()],
    hours: randomDate.getHours(),
    minutes: randomDate.getMinutes()
  };
};

const getRandomHashtags = (max = 3) => {
  const hashtags = new Set();
  const count = getRandomInteger(0, max);
  if (count > 0) {
    do {
      hashtags.add(ALL_HASHTAGS[getRandomIndex(ALL_HASHTAGS)]);
    } while (hashtags.size < count);
  }
  return [...hashtags];
};

const createTask = () => {
  const task = {
    label: LABELS[getRandomIndex(LABELS)],
    dueDate: getRandomDate(),
    hashtags: getRandomHashtags(),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    color: COLORS[getRandomIndex(COLORS)],
    repeatingDays: [
      [`mo`, Boolean(getRandomInteger(0, 1))],
      [`tu`, Boolean(getRandomInteger(0, 1))],
      [`we`, Boolean(getRandomInteger(0, 1))],
      [`th`, Boolean(getRandomInteger(0, 1))],
      [`fr`, Boolean(getRandomInteger(0, 1))],
      [`sa`, Boolean(getRandomInteger(0, 1))],
      [`su`, Boolean(getRandomInteger(0, 1))]
    ],
    isRepeat: Boolean(getRandomInteger(0, 1)),
    isFavorite: true,
    isDone: false,
    isDeadline: Boolean(getRandomInteger(0, 1))
  };
  return task;
};

const createTasks = () => {
  let tasks = [...(new Array(getRandomInteger(1, 10)))];
  tasks = tasks.map((createTask));
  return tasks;
};

// Имитация загрузки данных с сервера
const downloaded = {filters, tasks: createTasks()};

export {COLORS, downloaded};
