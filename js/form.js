import { isEscapeKeydown } from './util.js';
import { cancelValidate } from './validate-form.js';

const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('#upload-select-image');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const closeUploadForm = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadInput.value = '';
  cancelValidate();
  imageUploadCancel.removeEventListener('click', onButtonResetClick);
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  hashtagInput.removeEventListener('input', onHashtagInputEvent);
};

const openUploadForm = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imageUploadCancel.addEventListener('click', onButtonResetClick);
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  hashtagInput.addEventListener('input', onHashtagInputEvent);
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
  initUploadForm
};


