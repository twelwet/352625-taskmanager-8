// main.js

import {filters, createTasks} from './mock-data.js';
import getFilterTemplate from './get-filter-template.js';
import getTaskTemplate from './get-task-template.js';
import {render} from './utils.js';

const filtersContainer = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);

render(filters, getFilterTemplate, filtersContainer);
render(createTasks(), getTaskTemplate, tasksContainer);

filtersContainer.querySelectorAll(`input`).forEach((item) => {
  item.addEventListener(`click`, () => {
    render(createTasks(), getTaskTemplate, tasksContainer);
  });
});
