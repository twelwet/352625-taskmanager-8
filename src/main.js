// main.js

import {downloaded} from './mock-data.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';
import Filter from './filter.js';

const filtersContainer = document.querySelector(`.main__filter`);

const filters = downloaded.filters.map((item) => {
  item = new Filter(item);
  return item;
});

filters.forEach((item) => filtersContainer.appendChild(item.render()));

const tasksContainer = document.querySelector(`.board__tasks`);

const taskComponent = new Task(downloaded.tasks[0]);
const editTaskComponent = new TaskEdit(downloaded.tasks[0]);

tasksContainer.appendChild(taskComponent.render());

taskComponent.onEdit = () => {
  editTaskComponent.render();
  tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
  taskComponent.unrender();
};

editTaskComponent.onSubmit = () => {
  taskComponent.render();
  tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
  editTaskComponent.unrender();
};
