// main.js

import {downloaded} from './mock-data.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';
import Filter from './filter.js';
import moment from 'moment';
import {tagsChart, colorsChart} from './stat.js';

const filtersContainer = document.querySelector(`.main__filter`);

const filters = downloaded.filters.map((item) => {
  item = new Filter(item);
  return item;
});

filters.forEach((item) => filtersContainer.appendChild(item.render()));

const filterTasks = (tasks, filterName) => {
  switch (filterName) {

    case `filter__all`:
      return tasks;

    case `filter__overdue`:
      return tasks.filter((it) => moment(it.dueDate) < moment());

    case `filter__today`:
      return tasks.filter((it) => moment(it.dueDate).format(`D MMMM`) === moment().format(`D MMMM`));

    case `filter__favorites`:
      return tasks.filter((it) => it.isFavorite === true);

    case `filter__repeating`:
      return tasks.filter((it) => [...Object.entries(it.repeatingDays)].some((rec) => rec[1]));

    case `filter__tags`:
      return tasks.filter((it) => [...it.tags].some((rec) => rec[1]));

    case `filter__archive`:
      return tasks.filter((it) => it.isDone === true);

    default:
      throw new Error(`Unknown filter name`);
  }
};

filtersContainer.onchange = (evt) => {
  const filterName = evt.target.id;
  const filteredTasks = filterTasks(downloaded.tasks, filterName);
  renderTasks(filteredTasks);
};

const tasksContainer = document.querySelector(`.board__tasks`);

const deleteTask = (tasks, taskToDelete) => {
  const index = tasks.findIndex((it) => it === taskToDelete);
  tasks.splice(index, 1);
};

const renderTasks = (tasks) => {
  tasksContainer.innerHTML = ``;

  for (const task of tasks) {
    const taskComponent = new Task(task);
    const editTaskComponent = new TaskEdit(task);

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
      editTaskComponent.createListeners();
    };

    editTaskComponent.onSubmit = (newObject) => {
      task.label = newObject.label;
      task.color = newObject.color;
      task.dueDate = newObject.dueDate;
      task.repeatingDays = newObject.repeatingDays;
      task.isFavorite = newObject.isFavorite;
      task.isDone = newObject.isDone;
      taskComponent.update(task);
      taskComponent.render();
      tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

    editTaskComponent.onDelete = () => {
      tasksContainer.removeChild(editTaskComponent.element);
      editTaskComponent.unrender();
      deleteTask(tasks, task);
    };

    tasksContainer.appendChild(taskComponent.render());
  }
};

renderTasks(downloaded.tasks);

// tagsChart.update();
// colorsChart.update();
