// stat-tags.js

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const getTagsBunch = (tasks) => {
  const bunch = [];

  for (const task of tasks) {
    for (const tag of [...task.tags]) {
      bunch.push(tag);
    }
  }
  return bunch;
};

const getTagsStat = (tasks) => {
  const doneTasks = tasks.filter((it) => it.isDone === true);
  const bunch = getTagsBunch(doneTasks);
  const uniqueTags = [...new Set(bunch)];

  const names = [];
  const quantites = [];
  for (const tag of uniqueTags) {
    names.push(`#${tag}`);
    quantites.push(bunch.filter((it) => it === tag).length);
  }

  return {names, quantites};
};

const tagsWrap = document.querySelector(`.statistic__tags-wrap`);
const tagsCtx = tagsWrap.querySelector(`.statistic__tags`);

const getTagsChart = () => new Chart(tagsCtx, {
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

export {getTagsStat, getTagsChart, tagsWrap};
