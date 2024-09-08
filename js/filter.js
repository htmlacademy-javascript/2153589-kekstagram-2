import { debounce, shuffleArray } from './util.js';

const imageFiltersContainer = document.querySelector('.img-filters');
const imageFiltersButtons = document.querySelectorAll('.img-filters__button');

const RANDOM_SIZE = 10;
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const FILTER = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const getRandomElements = (elementsArray) => {
  const elementsSet = new Set(elementsArray);
  const maxSize = Math.min(RANDOM_SIZE, elementsSet.size);
  const returnedElements = shuffleArray(Array.from(elementsSet));

  return returnedElements.slice(0, maxSize);
};

const getSortedElements = (elements) => elements.slice().sort((a, b) => b.comments.length - a.comments.length);

const changeActiveButton = (targetElement) => {
  imageFiltersButtons.forEach((button) => {
    button.classList.remove(ACTIVE_BUTTON_CLASS);
  });
  targetElement.classList.add(ACTIVE_BUTTON_CLASS);
};

const removeElements = () => {
  const pictureElements = document.querySelectorAll('.picture');
  pictureElements.forEach((elem) => {
    elem.remove();
  });
};

const pickFilter = debounce((pictures, id, cb) => {
  removeElements();
  switch (id) {
    case FILTER.RANDOM:
      cb(getRandomElements(pictures));
      return;
    case FILTER.DISCUSSED:
      cb(getSortedElements(pictures));
      return;
    case FILTER.DEFAULT:
      cb(pictures);
      return;
    default:
      throw new Error(`Unknown filter id: ${id}`);
  }
});

const setFilters = (pictures, cb) => {
  imageFiltersContainer.classList.remove('img-filters--inactive');
  imageFiltersContainer.addEventListener('click', (evt) => {

    if (!evt.target.id) {
      return;
    }

    if (evt.target.classList.contains(ACTIVE_BUTTON_CLASS)) {
      return;
    }

    changeActiveButton(evt.target);
    pickFilter(pictures, evt.target.id, cb);
  });
};

export {
  setFilters
};
