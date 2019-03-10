// utils.js

const createElement = (template) => {
  // [Вопрос] Подскажи как избавиться от лишней обертки `div`?
  // const wrapper = document.createElement(`template`) и return wrapper.content - не помогает.
  // const wrapper = document.createElement(`div`) и return wrapper.firstChild - не корректно работает когда в обертке больше одного потомка.
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper;
};

const getRandomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

export {createElement, getRandomInteger};
