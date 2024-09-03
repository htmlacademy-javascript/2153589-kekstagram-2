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

export {
  transformArrayToObject,
  isEscapeKeydown,
  hasDuplicates,
  resetScale
};


