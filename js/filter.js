import { debounce, shuffleArray } from './util.js';
import { FILTER, NOTIFICATON } from './constants.js';

const imageFiltersContainer = document.querySelector('.img-filters');
const imageFiltersButtons = document.querySelectorAll('.img-filters__button');

const getRandomElements = (primaryElements) => {
  const elementsSet = new Set(primaryElements);
  const maxSize = Math.min(FILTER.RANDOM_SIZE, elementsSet.size);
  const returnedElements = shuffleArray(Array.from(elementsSet));

  return returnedElements.slice(0, maxSize);
};

const getSortedElements = (elements) => elements.slice().sort((a, b) => b.comments.length - a.comments.length);

const changeActiveButton = (targetElement) => {
  imageFiltersButtons.forEach((button) => {
    button.classList.remove(FILTER.ACTIVE_BUTTON_CLASS);
  });
  targetElement.classList.add(FILTER.ACTIVE_BUTTON_CLASS);
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
    case FILTER.TYPE.RANDOM:
      cb(getRandomElements(pictures));
      return;
    case FILTER.TYPE.DISCUSSED:
      cb(getSortedElements(pictures));
      return;
    case FILTER.TYPE.DEFAULT:
      cb(pictures);
      return;
    default:
      throw new Error(`${NOTIFICATON.MESSAGE.UNKNOWN_FILTER_ID}: ${id}`);
  }
});

const setFilters = (pictures, cb) => {
  imageFiltersContainer.classList.remove('img-filters--inactive');
  imageFiltersContainer.addEventListener('click', (evt) => {

    if (!evt.target.id) {
      return;
    }

    if (evt.target.classList.contains(FILTER.ACTIVE_BUTTON_CLASS)) {
      return;
    }

    changeActiveButton(evt.target);
    pickFilter(pictures, evt.target.id, cb);
  });
};

export {
  setFilters
};
