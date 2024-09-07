import { getRandomSetElement, debounce } from './util.js';

const imageFiltersContainer = document.querySelector('.img-filters');
const imageFiltersButtons = document.querySelectorAll('.img-filters__button');

const RERENDER_DELAY = 500;
const RANDOM_SIZE = 10;
const OPTIONS = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const getRandomElements = (elementsArray) => {
  const elementsSet = new Set(elementsArray);
  const randomElementsSet = new Set();
  const maxSize = Math.min(RANDOM_SIZE, elementsSet.size);

  while (randomElementsSet.size < maxSize) {
    const newElement = getRandomSetElement(elementsSet);
    randomElementsSet.add(newElement);
  }

  return randomElementsSet;
};

const getSortedElements = (elements) => {
  const sortedElements = elements.slice().sort((elementA, elementB) => elementB?.comments.length - elementA?.comments.length);

  return sortedElements;
};

const changeActive = (targetElement) => {
  imageFiltersButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  targetElement.classList.add('img-filters__button--active');
};

const setFilters = (pictures, cb) => {
  const onDefaultButtonClick = debounce(() => cb(pictures), RERENDER_DELAY);
  const onRandomButtonClick = debounce(() => cb(getRandomElements(pictures)), RERENDER_DELAY);
  const onSortedButtonClick = debounce(() => cb(getSortedElements(pictures)), RERENDER_DELAY);

  imageFiltersContainer.classList.remove('img-filters--inactive');
  imageFiltersButtons.forEach((element) => {
    element.addEventListener('click', (evt) => {
      changeActive(evt.target);
      if (evt.target.getAttribute('id') === OPTIONS.RANDOM) {
        onRandomButtonClick();
        return;
      }

      if (evt.target.getAttribute('id') === OPTIONS.DISCUSSED) {
        onSortedButtonClick();
        return;
      }

      onDefaultButtonClick();
    });
  });
};

export {
  setFilters
};
