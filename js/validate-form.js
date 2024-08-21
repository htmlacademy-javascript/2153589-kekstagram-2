import { hasDuplicates } from './util.js';

const uploadImageForm = document.querySelector('#upload-select-image');
const hashtagInput = uploadImageForm.querySelector('.text__hashtags');
const commentTextarea = uploadImageForm.querySelector('.text__description');
const regHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
let errorId = null;
let isValid = false;

const errorTypes = {
  'invalidHashtag': 'введён невалидный хэштег',
  'manyHashtags': 'превышено количество хэштегов',
  'repeatHashtag': 'хэштеги повторяются',
  'longComment': 'длина комментария больше 140 символов'
};

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  // errorTextTag: 'div'
});

const getHashtagErrorMessage = () => errorTypes[errorId];

const validateHashtag = (value) => {
  if (!value) {
    return true;
  }
  const valueToArray = value.split(' ');
  if (valueToArray.length > 5) {
    errorId = 'manyHashtags';
    return false;
  }
  if (hasDuplicates(valueToArray)) {
    errorId = 'repeatHashtag';
    return false;
  }
  const filteredArray = valueToArray.filter((item) => regHashtag.test(item));
  if (valueToArray.length !== filteredArray.length) {
    errorId = 'invalidHashtag';
    return false;
  }
  return true;
};

const validateComment = (value) => {
  if (value.length > 140) {
    errorId = 'longComment';
    return false;
  }
  return true;
};

pristine.addValidator(hashtagInput, validateHashtag, getHashtagErrorMessage);
pristine.addValidator(commentTextarea, validateComment, getHashtagErrorMessage);

hashtagInput.addEventListener('change', () => {
  isValid = pristine.validate(hashtagInput);
});

commentTextarea.addEventListener('change', () => {
  isValid = pristine.validate(commentTextarea);
});

const validateUploadForm = () => uploadImageForm.addEventListener('submit', (evt) => {
  if (!isValid) {
    evt.preventDefault();
  }
});

export {
  validateUploadForm
};

