// Функция - генерация случайного числа в диапазоне
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// Функция - выбор случайного элемента в массиве
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция - генерация уникального id
const createId = () => {
  let id = 0;

  return () => ++id;
};

// Функция - генерация объекта из массива
const transformArrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});

const isEscapeKeydown = (evt) => evt.key === 'Escape';

export {
  getRandomInteger,
  getRandomArrayElement,
  createId,
  transformArrayToObject,
  isEscapeKeydown
};


