import { isEscapeKeydown } from './util.js';

const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('.img-upload__cancel');
const previewEffects = document.querySelectorAll('.effects__preview');
const uploadForm = document.querySelectorAll('#upload-select-image');

const setPreviewEffects = () => {
  previewEffects.forEach((item) => {
    item.style.backgroundImage = `url(${imageUploadInput.value})`;
  });
};

const closeUploadForm = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  imageUploadCancel.removeEventListener('click', closeUploadForm);
  document.removeEventListener('keydown', onEscapeKeydownForm);
};

const openUploadForm = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.img-upload__preview img').src = imageUploadInput.value;
  setPreviewEffects();
  imageUploadCancel.addEventListener('click', closeUploadForm);
  document.addEventListener('keydown', onEscapeKeydownForm);
};


function onEscapeKeydownForm(evt) {
  if (isEscapeKeydown(evt) && document.activeElement.className !== 'text__hashtags') {
    closeUploadForm();
  }
}

const getUploadFormHandler = () => imageUploadInput.addEventListener('change', openUploadForm);

export {
  getUploadFormHandler
};


