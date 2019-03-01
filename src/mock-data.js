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

const taskData = {
  color: `black`,
  text: `This is example of new task, you can add picture, set date and time, add tags.`,
  deadline: false,
  repeat: false
};

const getTasksList = () => {
  const tasks = new Array(getRandomInteger(1, 10));
  tasks.fill(taskData);
  return tasks;
};

export {filters, getTasksList};
