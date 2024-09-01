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

// Функция проверки на  дубликаты в массиве
const hasDuplicates = (arr) => arr.length !== new Set(arr).size;

const isEscapeKeydown = (evt) => evt.key === 'Escape';

const resetScale = (elem, input, value = '100%') => {
  elem.style.transform = 'scale(1)';
  if (input) {
    input.value = value;
  }
};

const createNotificationNode = (element) => element.cloneNode(true);

export {
  getRandomInteger,
  getRandomArrayElement,
  createId,
  transformArrayToObject,
  isEscapeKeydown,
  hasDuplicates,
  resetScale,
  createNotificationNode
};


