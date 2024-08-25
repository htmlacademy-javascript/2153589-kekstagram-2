const MAX_SIZE = 100;
const MIN_SIZE = 25;
const RESIZE_STEP = 25;
let imageSize = 100;

const increaseImage = (input, image) => {
  imageSize = (imageSize + RESIZE_STEP) > MAX_SIZE ? imageSize : imageSize + RESIZE_STEP;
  input.value = `${imageSize}%`;
  image.style.transform = `scale(${imageSize / 100})`;
};
const decreaseImage = (input, image) => {
  imageSize = (imageSize - RESIZE_STEP) < MIN_SIZE ? imageSize : imageSize - RESIZE_STEP;
  input.value = `${imageSize}%`;
  image.style.transform = `scale(${imageSize / 100})`;
};

export {
  increaseImage,
  decreaseImage
};

