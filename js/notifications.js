import { createNotificationNode, isEscapeKeydown } from './util.js';
import { blockSubmitButton } from './validate-form.js';

const errorDownloadTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorUploadTemplate = document.querySelector('#error').content.querySelector('.error');
const successUploadTemplate = document.querySelector('#success').content.querySelector('.success');

const errorDownloadElement = createNotificationNode(errorDownloadTemplate);
const errorUploadElement = createNotificationNode(errorUploadTemplate);
const successUploadElement = createNotificationNode(successUploadTemplate);

const renderDownloadNotification = (element) => {
  document.body.append(element);
  setTimeout(() => {
    element.remove();
  }, 5000);
};

const closeUploadNotification = () => {
  const element = document.querySelector('.success') || document.querySelector('.error');

  if (!element) {
    return;
  }

  element.querySelector('button').removeEventListener('click', onButtonClick);
  element.removeEventListener('click', onModalClick);
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  blockSubmitButton(false);
  element.remove();
};

const openUploadNotification = (element) => {
  document.body.append(element);
  element.querySelector('button').addEventListener('click', onButtonClick);
  element.addEventListener('click', onModalClick);
  document.addEventListener('keydown', onDocumentEscapeKeydown);
};


function onDocumentEscapeKeydown(evt) {
  evt.preventDefault();

  if (isEscapeKeydown(evt)) {
    closeUploadNotification();
  }
}


function onModalClick(evt) {
  if (evt.target.className !== 'success' && evt.target.className !== 'error') {
    return;
  }

  closeUploadNotification();
}

function onButtonClick() {
  closeUploadNotification();
}

const onDownloadFail = () => renderDownloadNotification(errorDownloadElement);
const onUploadFail = () => openUploadNotification(errorUploadElement);
const onUploadSuccess = () => openUploadNotification(successUploadElement);

export {
  onDownloadFail,
  onUploadFail,
  onUploadSuccess
};
