// stat-tags.js

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {duration} from './stat.js';

const getTagsStat = (tasks) => {
  const doneTasks = tasks.filter((it) => it.isDone && it.dueDate >= duration[0] && it.dueDate <= duration[1]);
  const bunch = [].concat(...doneTasks.map((task) => Array.from(task.tags)));
  const names = [...new Set(bunch)];
  const quantites = names.map((tag) => bunch.filter((it) => it === tag).length);
  // тут лучше сделать наоборот, обойти задачи и посчитать теги, раз у каждой задачи много тегов
  return {names: names.map((tag) => `#${tag}`), quantites};
};

const getTagsChart = (tagsCtx) => new Chart(tagsCtx, {
  plugins: [ChartDataLabels],
  type: `pie`,
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
    }]
  },
  options: {
    responsive: false,
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

export {getTagsStat, getTagsChart};
