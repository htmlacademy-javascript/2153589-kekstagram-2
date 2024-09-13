const RERENDER_DELAY = 500;

const transformArrayToObject = (elements) =>
  elements.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});

const hasDuplicates = (elements) => elements.length !== new Set(elements).size;

const shuffleArray = (elements) => {
  let i = elements.length;
  while (--i > 0) {
    const randIndex = Math.floor(Math.random() * (i + 1));
    [elements[randIndex], elements[i]] = [elements[i], elements[randIndex]];
  }
  return elements;
};

const isEscapeKeydown = (evt) => evt.key === 'Escape';

const resetScale = (elem, input, value = '100%') => {
  elem.style.transform = 'scale(1)';
  if (input) {
    input.value = value;
  }
};

const debounce = (callback, timeoutDelay = RERENDER_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  transformArrayToObject,
  isEscapeKeydown,
  hasDuplicates,
  resetScale,
  shuffleArray,
  debounce
};


