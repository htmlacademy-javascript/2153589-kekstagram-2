import { hasDuplicates } from './util.js';

const uploadImageForm = document.querySelector('#upload-select-image');
const hashtagInput = uploadImageForm.querySelector('.text__hashtags');
const commentTextarea = uploadImageForm.querySelector('.text__description');

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_MAX_COUNT = 5;
const regHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
let errorId = null;


const errorTypes = {
  'invalidHashtag': 'введён невалидный хэштег',
  'manyHashtags': 'превышено количество хэштегов',
  'repeatHashtag': 'хэштеги повторяются',
  'longComment': `длина комментария больше ${COMMENT_MAX_LENGTH} символов`
};

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

const getHashtagErrorMessage = () => errorTypes[errorId];

const validateHashtag = (value) => {
  if (!value) {
    return true;
  }

  const valueToArray = value.split(' ');
  const isValidHashtag = valueToArray.every((item) => regHashtag.test(item));

  if (!isValidHashtag) {
    errorId = 'invalidHashtag';
    return false;
  }

  if (hasDuplicates(valueToArray)) {
    errorId = 'repeatHashtag';
    return false;
  }

  if (valueToArray.length > HASHTAG_MAX_COUNT) {
    errorId = 'manyHashtags';
    return false;
  }

  return true;
};

const validateComment = (value) => {
  if (value.length > COMMENT_MAX_LENGTH) {
    errorId = 'longComment';
    return false;
  }

  return true;
};

const onFormSubmit = (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
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
  cancelValidate
};

