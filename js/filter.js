import { shuffleArray } from './util.js';

const imageFiltersContainer = document.querySelector('.img-filters');
const imageFiltersButtons = document.querySelectorAll('.img-filters__button');

const RANDOM_SIZE = 10;
const OPTIONS = {
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

const changeActive = (targetElement) => {
  imageFiltersButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  targetElement.classList.add('img-filters__button--active');
};

const removeElements = () => {
  const pictureElements = document.querySelectorAll('.picture');
  pictureElements.forEach((elem) => {
    elem.remove();
  });
};

const setFilters = (pictures, cb) => {
  imageFiltersContainer.classList.remove('img-filters--inactive');
  imageFiltersContainer.addEventListener('click', (evt) => {

    if (!Object.values(OPTIONS).includes(evt.target.id)) {
      return;
    }

    changeActive(evt.target);

    switch (evt.target.id) {
      case OPTIONS.RANDOM:
        cb(getRandomElements(pictures), removeElements);
        return;
      case OPTIONS.DISCUSSED:
        cb(getSortedElements(pictures), removeElements);
        return;
      default:
        cb(pictures, removeElements);
    }
  });
};

export {
  setFilters
};
