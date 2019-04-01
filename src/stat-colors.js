// stat-colors.js

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const getColorsBunch = (tasks) => {
  const bunch = [];

  for (const task of tasks) {
    bunch.push(task.color);
  }
  return bunch;
};

const getColorsStat = (tasks) => {
  const doneTasks = tasks.filter((it) => it.isDone === true);
  const bunch = getColorsBunch(doneTasks);
  const uniqueColors = [...new Set(bunch)];

  const colors = [];
  const quantites = [];
  for (const color of uniqueColors) {
    colors.push(color);
    quantites.push(bunch.filter((it) => it === color).length);
  }

  return {colors, quantites};
};

const colorsWrap = document.querySelector(`.statistic__colors-wrap`);
const colorsCtx = colorsWrap.querySelector(`.statistic__colors`);

const getColorsChart = () => new Chart(colorsCtx, {
  plugins: [ChartDataLabels],
  type: `pie`,
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
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

export {getColorsStat, getColorsChart, colorsWrap};
