// main.js

import {getRandomInteger} from './utils.js';
import {downloaded} from './mock-data.js';
import Task from './task.js';
import Filter from './filter.js';

const tasks = downloaded.tasks.map((item) => {
  item = new Task(item);
  return item;
});

const filters = downloaded.filters.map((item) => {
  item = new Filter(item);
  return item;
});

const filtersContainer = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);

filters.forEach((item) => item.render(filtersContainer));
tasks.forEach((item) => item.render(tasksContainer));

filtersContainer.querySelectorAll(`input`).forEach((item) => {
  item.addEventListener(`click`, () => {
    tasks.forEach((it) => it.unrender(tasksContainer));
    // Имитация сортировки:
    tasks.forEach((it) => {
      if (getRandomInteger(0, 1)) {
        it.render(tasksContainer);
      } else {
        it.unrender(tasksContainer);
      }
    });
  });
});
