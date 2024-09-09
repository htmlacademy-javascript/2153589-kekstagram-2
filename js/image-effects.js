import { resetScale } from './util.js';
import { PREVIEW } from './constants.js';

const effectLevelInput = document.querySelector('.effect-level__value');
const previewImage = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderElementContainer = document.querySelector('.img-upload__effect-level');
const scaleControlValueInput = document.querySelector('.scale__control--value');

let currentEffect = 'none';

const hideSlider = (isActive = true) => {
  if (isActive) {
    sliderElement.classList.add('hidden');
    sliderElementContainer.classList.add('hidden');
  } else {
    sliderElement.classList.remove('hidden');
    sliderElementContainer.classList.remove('hidden');
  }
};

const setInitialFeatures = () => {
  effectLevelInput.value = '';
  previewImage.style.filter = 'none';
  hideSlider();
};

noUiSlider.create(sliderElement, {
  start: 1,
  range: {
    'min': 0,
    'max': 1
  },
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

const changeSliderFeatures = (min, max, step, start) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    step,
    start
  });
};

const createImageEffect = (value) => {
  previewImage.style.filter = `${value}`;
};

const onEffectButtonChange = (evt) => {
  currentEffect = evt.target.value;
  resetScale(previewImage, scaleControlValueInput);

  if (currentEffect === 'none') {
    setInitialFeatures();
    return;
  }

  const { min, max, step, start, getEffect } = PREVIEW.EFFECTS[currentEffect];
  hideSlider(false);
  changeSliderFeatures(min, max, step, start);
  createImageEffect(getEffect(start));
  effectLevelInput.value = start;
};

sliderElement.noUiSlider.on('update', () => {
  effectLevelInput.value = sliderElement.noUiSlider.get();
  createImageEffect(PREVIEW.EFFECTS[currentEffect]?.getEffect(effectLevelInput.value));
});

const setRadioListeners = (elements) => {
  elements.forEach((button) => {
    button.addEventListener('change', onEffectButtonChange);
  });
};

const deleteRadioListeners = (elements) => {
  elements.forEach((button) => {
    button.removeEventListener('change', onEffectButtonChange);
  });
};

export {
  setInitialFeatures,
  setRadioListeners,
  deleteRadioListeners,
  hideSlider
};


