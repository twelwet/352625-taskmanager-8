// mock-data.js

import {getRandomInteger} from './utils.js';

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

const getRandomLabel = () => {
  const labels = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
  return labels[getRandomInteger(0, (labels.length - 1))];
};

const getRandomDate = () => {
  const months = [`january`, `february`, `march`, `april`, `may`, `june`, `july`, `august`, `september`, `october`, `november`, `december`];
  const week = 604800000; // ms
  const randomDate = new Date(Date.now() + getRandomInteger(-week, week));
  return {
    date: randomDate.getDate(),
    month: months[randomDate.getMonth()],
    hours: randomDate.getHours(),
    minutes: randomDate.getMinutes()
  };
};

const getRandomHashtages = (max = 3) => {
  const allHashtagsSet = new Set([`homework`, `theory`, `practice`, `intensive`, `keks`]);
  const allHashtags = [...allHashtagsSet];
  const randomHashtags = [];
  const getRandomIndex = () => {
    return getRandomInteger(0, allHashtags.length - 1);
  };
  // [ВОПРОС] Как в данном случае обойтись без цикла с `i` ?
  for (let i = 0; i < getRandomInteger(0, max); i++) {
    const randomHashtag = allHashtags.splice(getRandomIndex(), 1).toString();
    randomHashtags.push(randomHashtag);
  }
  return randomHashtags;
};

const getRandomColor = () => {
  const colors = [`black`, `yellow`, `blue`, `green`, `pink`];
  return colors[getRandomInteger(0, (colors.length - 1))];
};

const createTask = () => {
  const task = {
    label: getRandomLabel(),
    dueDate: {
      date: getRandomDate().date,
      month: getRandomDate().month,
      hours: getRandomDate().hours,
      minutes: getRandomDate().minutes,
    },
    hashtags: getRandomHashtages(),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    color: getRandomColor(),
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
  const tasks = [];
  // [ВОПРОС] Какой метод массива использовать, чтобы обойтись без цикла с `i` ?
  for (let i = 0; i < getRandomInteger(1, 10); i++) {
    tasks.push(createTask());
  }
  return tasks;
};

export {filters, createTasks};
