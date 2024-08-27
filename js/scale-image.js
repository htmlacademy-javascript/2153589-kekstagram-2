const MAX_SIZE = 100;
const MIN_SIZE = 25;
const RESIZE_STEP = 25;

const increaseImage = (input, image) => {
  const inputValue = Math.min(parseInt(input.value, 10) + RESIZE_STEP, MAX_SIZE);
  input.value = `${inputValue}%`;
  image.style.transform = `scale(${inputValue / 100})`;
};
const decreaseImage = (input, image) => {
  const inputValue = Math.max(parseInt(input.value, 10) - RESIZE_STEP, MIN_SIZE);
  input.value = `${inputValue}%`;
  image.style.transform = `scale(${inputValue / 100})`;
};

export {
  increaseImage,
  decreaseImage
};

