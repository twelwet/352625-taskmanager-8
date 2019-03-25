// mock-data.js

import {getRandomInteger} from './utils.js';

const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
const LABELS = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
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
    disabled: false,
    count: getRandomInteger(1, 100)
  },
  {
    name: `today`,
    checked: false,
    disabled: false,
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
  return Date.now() + getRandomInteger(-WEEK, WEEK);
};

const getRandomHashtags = (max = 3) => {
  const hashtags = new Set();
  const count = getRandomInteger(0, max);
  if (count > 0) {
    do {
      hashtags.add(ALL_HASHTAGS[getRandomIndex(ALL_HASHTAGS)]);
    } while (hashtags.size < count);
  }
  return hashtags;
};

const createTask = () => {
  const task = {
    id: null,
    label: LABELS[getRandomIndex(LABELS)],
    dueDate: getRandomDate(),
    tags: getRandomHashtags(),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    color: COLORS[getRandomIndex(COLORS)],
    repeatingDays: {
      mo: Boolean(getRandomInteger(0, 0)),
      tu: Boolean(getRandomInteger(0, 1)),
      we: Boolean(getRandomInteger(0, 0)),
      th: Boolean(getRandomInteger(0, 1)),
      fr: Boolean(getRandomInteger(0, 0)),
      sa: Boolean(getRandomInteger(0, 0)),
      su: Boolean(getRandomInteger(0, 0))
    },
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isArchive: Boolean(getRandomInteger(0, 1)),
    isDone: false
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

for (let task of downloaded.tasks) {
  task.id = downloaded.tasks.indexOf(task);
}

export {COLORS, downloaded};
