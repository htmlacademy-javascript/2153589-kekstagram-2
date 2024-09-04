const MAX_SIZE = 100;
const MIN_SIZE = 25;
const RESIZE_STEP = 25;

const increaseImage = (input, image) => {
  const inputValue = Math.min(parseInt(input.value, 10) + RESIZE_STEP, MAX_SIZE);
  image.style.transform = `scale(${inputValue / 100})`;
  return inputValue;
};
const decreaseImage = (input, image) => {
  const inputValue = Math.max(parseInt(input.value, 10) - RESIZE_STEP, MIN_SIZE);
  image.style.transform = `scale(${inputValue / 100})`;
  return inputValue;
};

export {
  increaseImage,
  decreaseImage
};

