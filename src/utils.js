// utils.js

const createElement = (template) => {
  // [Вопрос] Как избавиться от оберток div-ов так и не придумал.
  // 1. Пробовал const wrapper = document.createElement(`template`);
  //    но все ломается при перерисовке
  // 2. Пробовал оставить const wrapper = document.createElement(`div`);
  //    и делать return wrapper.firstChild;
  //    тоже не помогло.
  // Посоветуй как быть?
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = (template);
  return wrapper;
};

const getRandomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

export {createElement, getRandomInteger};
