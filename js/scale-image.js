import { PREVIEW } from './constants.js';

const increaseImage = (input, image) => {
  const inputValue = Math.min(parseInt(input.value, 10) + PREVIEW.RESIZE_STEP, PREVIEW.MAX_SIZE);
  image.style.transform = `scale(${inputValue / 100})`;
  return inputValue;
};
const decreaseImage = (input, image) => {
  const inputValue = Math.max(parseInt(input.value, 10) - PREVIEW.RESIZE_STEP, PREVIEW.MIN_SIZE);
  image.style.transform = `scale(${inputValue / 100})`;
  return inputValue;
};

export {
  increaseImage,
  decreaseImage
};

