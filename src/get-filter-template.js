// get-filter-template.js

const getFilterTemplate = (data) => {
  const template = document.createElement(`template`);
  template.innerHTML = `
  <input
    type="radio"
    id="filter__${data.name}"
    class="filter__input visually-hidden"
    name="filter"
    ${data.checked ? `checked` : ``} ${data.disabled ? `disabled` : ``}
  />
  <label for="filter__${data.name}" class="filter__label"
    >${data.name} <span class="filter__archive-count">${data.count}</span></label>
  `;
  return template;
};

export default getFilterTemplate;
