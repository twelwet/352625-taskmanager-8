// main.js

import {downloaded, WEEK} from './mock-data.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';
import Filter from './filter.js';
import moment from 'moment';
import flatpickr from 'flatpickr';
import Chart from 'chart.js';

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

const taskBoard = document.querySelector(`.board`);
const statContainer = document.querySelector(`.statistic`);

const tasksButton = document.querySelector(`#control__task`);
const statButton = document.querySelector(`#control__statistic`);

const showTaskBoard = () => taskBoard.classList.remove(`visually-hidden`);
const hideTaskBoard = () => taskBoard.classList.add(`visually-hidden`);

const showStat = () => statContainer.classList.remove(`visually-hidden`);
const hideStat = () => statContainer.classList.add(`visually-hidden`);

statButton.addEventListener(`click`, () => {
  hideTaskBoard();
  showStat();
});

tasksButton.addEventListener(`click`, () => {
  hideStat();
  showTaskBoard();
});

const statPeriod = statContainer.querySelector(`.statistic__period-input`);

const getDate = () => {
  const now = Date.now();
  return {
    now: moment(now).format(`D MMMM`),
    plusWeek: moment(now + WEEK).format(`D MMMM`)
  };
};

flatpickr(statPeriod, {
  mode: `range`,
  altInput: true, altFormat: `j F`,
  dateFormat: `j F`,
  defaultDate: [getDate().now, getDate().plusWeek]
});

const tagsCtx = document.querySelector(`.statistic__tags`);
const colorsCtx = document.querySelector(`.statistic__colors`);

// В разрезе тегов
const tagsChart = new Chart(tagsCtx, {
  plugins: [ChartDataLabels],
  type: `pie`,
  data: {
    labels: [`#watchstreams`, `#relaxation`, `#coding`, `#sleep`, `#watermelonpies`],
    datasets: [{
      data: [20, 15, 10, 5, 2],
      backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
    }]
  },
  options: {
    plugins: {
      datalabels: {
        display: false
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipData = allData[tooltipItem.index];
          const total = allData.reduce((acc, it) => acc + parseFloat(it));
          const tooltipPercentage = Math.round((tooltipData / total) * 100);
          return `${tooltipData} TASKS — ${tooltipPercentage}%`;
        }
      },
      displayColors: false,
      backgroundColor: `#ffffff`,
      bodyFontColor: `#000000`,
      borderColor: `#000000`,
      borderWidth: 1,
      cornerRadius: 0,
      xPadding: 15,
      yPadding: 15
    },
    title: {
      display: true,
      text: `DONE BY: TAGS`,
      fontSize: 16,
      fontColor: `#000000`
    },
    legend: {
      position: `left`,
      labels: {
        boxWidth: 15,
        padding: 25,
        fontStyle: 500,
        fontColor: `#000000`,
        fontSize: 13
      }
    }
  }
});

// В разрезе цветов
const colorsChart = new Chart(colorsCtx, {
  plugins: [ChartDataLabels],
  type: `pie`,
  data: {
    labels: [`#pink`, `#yellow`, `#blue`, `#black`, `#green`],
    datasets: [{
      data: [5, 25, 15, 10, 30],
      backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
    }]
  },
  options: {
    plugins: {
      datalabels: {
        display: false
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipData = allData[tooltipItem.index];
          const total = allData.reduce((acc, it) => acc + parseFloat(it));
          const tooltipPercentage = Math.round((tooltipData / total) * 100);
          return `${tooltipData} TASKS — ${tooltipPercentage}%`;
        }
      },
      displayColors: false,
      backgroundColor: `#ffffff`,
      bodyFontColor: `#000000`,
      borderColor: `#000000`,
      borderWidth: 1,
      cornerRadius: 0,
      xPadding: 15,
      yPadding: 15
    },
    title: {
      display: true,
      text: `DONE BY: COLORS`,
      fontSize: 16,
      fontColor: `#000000`
    },
    legend: {
      position: `left`,
      labels: {
        boxWidth: 15,
        padding: 25,
        fontStyle: 500,
        fontColor: `#000000`,
        fontSize: 13
      }
    }
  }
});
