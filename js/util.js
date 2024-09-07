const transformArrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});

const hasDuplicates = (arr) => arr.length !== new Set(arr).size;

function getRandomSetElement(collection) {
  const values = Array.from(collection.values());
  return values[Math.floor(Math.random() * values.length)];
}

const isEscapeKeydown = (evt) => evt.key === 'Escape';

const resetScale = (elem, input, value = '100%') => {
  elem.style.transform = 'scale(1)';
  if (input) {
    input.value = value;
  }
};

const debounce = (callback, timeoutDelay) => {
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
  getRandomSetElement,
  resetScale,
  debounce
};


