const RERENDER_DELAY = 500;

const transformArrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});

const hasDuplicates = (arr) => arr.length !== new Set(arr).size;

const shuffleArray = (arr) => {
  let i = arr.length;
  while (--i > 0) {
    const randIndex = Math.floor(Math.random() * (i + 1));
    [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
  }
  return arr;
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


