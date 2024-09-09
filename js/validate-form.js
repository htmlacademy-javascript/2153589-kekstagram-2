import { hasDuplicates } from './util.js';
import { sendData } from './api.js';
import { onUploadFail, onUploadSuccess } from './notifications.js';
import { closeUploadForm } from './form.js';
import { VALIDATE, VALIDATE_ERROR_TYPES, PREVIEW } from './constants.js';

let errorId = null;

const uploadImageForm = document.querySelector('#upload-select-image');
const uploadFormSubmit = uploadImageForm.querySelector('#upload-submit');
const hashtagInput = uploadImageForm.querySelector('.text__hashtags');
const commentTextarea = uploadImageForm.querySelector('.text__description');
const errorTextBlock = document.querySelector('.img-upload__field-wrapper');

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

const getHashtagErrorMessage = () => VALIDATE_ERROR_TYPES[errorId];

const renderWarning = (isActive) => {
  if (isActive) {
    errorTextBlock.classList.add(VALIDATE.WARNING_CLASS);
  } else {
    errorTextBlock.classList.remove(VALIDATE.WARNING_CLASS);
  }
};

const validateHashtag = (value) => {
  renderWarning(false);

  if (!value) {
    return true;
  }

  const valueToArray = value.toLowerCase().split(' ').filter((item) => item !== '');
  const isValidHashtag = valueToArray.every((item) => VALIDATE.HASHTAG_REGEX.test(item));

  if ((value.match(/#/g) || []).length > VALIDATE.HASHTAG_MAX_COUNT) {
    errorId = 'manyHashtags';
    return false;
  }

  if (!isValidHashtag) {

    if ((value.charAt(0) === '#' && value.length === 1) || value.slice(-2) === ' #') {
      errorId = 'onlyHash';
      renderWarning(true);
    } else {
      errorId = 'invalidHashtag';
      renderWarning(false);
    }

    return false;
  }

  if (hasDuplicates(valueToArray)) {
    errorId = 'repeatHashtag';
    return false;
  }

  return true;
};

const validateComment = (value) => {
  if (value.length > VALIDATE.COMMENT_MAX_LENGTH) {
    errorId = 'longComment';
    return false;
  }

  return true;
};

const blockSubmitButton = () => {
  uploadFormSubmit.textContent = PREVIEW.BUTTON_SIGN.PROCESS;
  uploadFormSubmit.setAttribute('disabled', '');
};

const unblockSubmitButton = () => {
  uploadFormSubmit.removeAttribute('disabled');
  uploadFormSubmit.textContent = PREVIEW.BUTTON_SIGN.INITIAL;
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    try {
      await sendData(new FormData(evt.target));
      onUploadSuccess();
      closeUploadForm();
    } catch (err) {
      onUploadFail();
    } finally {
      unblockSubmitButton();
    }

  }
};

const validateUploadForm = () => {
  pristine.addValidator(hashtagInput, validateHashtag, getHashtagErrorMessage);
  pristine.addValidator(commentTextarea, validateComment, getHashtagErrorMessage);
  uploadImageForm.addEventListener('submit', onFormSubmit);
};

const cancelValidate = () => {
  pristine.reset();
};

export {
  validateUploadForm,
  cancelValidate,
  blockSubmitButton
};

