import { isEscapeKeydown, resetScale } from './util.js';
import { cancelValidate } from './validate-form.js';
import { increaseImage, decreaseImage } from './scale-image.js';
import { setRadioListeners, deleteRadioListeners, setInitialFeatures } from './image-effects.js';

const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('#upload-select-image');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const scaleControlSmallerButton = document.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = document.querySelector('.scale__control--bigger');
const scaleControlValueInput = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');
const effectButtons = document.querySelectorAll('.effects__radio');

const onButtonBiggerClick = () => {
  scaleControlValueInput.value = `${increaseImage(scaleControlValueInput, previewImage)}%`;
};
const onButtonSmallerClick = () => {
  scaleControlValueInput.value = `${decreaseImage(scaleControlValueInput, previewImage)}%`;
};

const closeUploadForm = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  cancelValidate();
  imageUploadCancel.removeEventListener('click', onButtonResetClick);
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  hashtagInput.removeEventListener('input', onHashtagInputEvent);
  scaleControlSmallerButton.removeEventListener('click', onButtonSmallerClick);
  scaleControlBiggerButton.removeEventListener('click', onButtonBiggerClick);
  deleteRadioListeners(effectButtons);
  resetScale(previewImage, scaleControlValueInput);
  setInitialFeatures();
  uploadForm.reset();
};

const openUploadForm = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imageUploadCancel.addEventListener('click', onButtonResetClick);
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  hashtagInput.addEventListener('input', onHashtagInputEvent);
  scaleControlSmallerButton.addEventListener('click', onButtonSmallerClick);
  scaleControlBiggerButton.addEventListener('click', onButtonBiggerClick);
  setRadioListeners(effectButtons);
};

const limitHashtagSpaces = () => {
  if (hashtagInput.value.charAt(0) === ' ') {
    hashtagInput.value = '';
  }

  hashtagInput.value = hashtagInput.value.replace(/\s{2,}$/, ' ');
};

function onButtonResetClick(evt) {
  evt.preventDefault();
  uploadForm.reset();
  closeUploadForm();
}

function onDocumentEscapeKeydown(evt) {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();

    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closeUploadForm();
    }
  }
}

function onHashtagInputEvent() {
  limitHashtagSpaces();
}

const initUploadForm = () => imageUploadInput.addEventListener('change', openUploadForm);

export {
  initUploadForm,
  closeUploadForm
};


