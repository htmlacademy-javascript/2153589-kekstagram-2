import { isEscapeKeydown } from './util.js';
import { NOTIFICATON } from './constants.js';

const errorDownloadTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorUploadTemplate = document.querySelector('#error').content.querySelector('.error');
const successUploadTemplate = document.querySelector('#success').content.querySelector('.success');

const errorDownloadElement = errorDownloadTemplate.cloneNode(true);
const errorUploadElement = errorUploadTemplate.cloneNode(true);
const successUploadElement = successUploadTemplate.cloneNode(true);

const renderDownloadNotification = (element) => {
  document.body.append(element);
  setTimeout(() => {
    element.remove();
  }, NOTIFICATON.REMOVE_TIMEOUT);
};

const openUploadNotification = (element) => {
  document.body.append(element);

  const close = () => {
    document.removeEventListener('keydown', onDocumentEscapeKeydown);
    element.remove();
  };

  function onDocumentEscapeKeydown(evt) {
    evt.preventDefault();

    if (isEscapeKeydown(evt)) {
      close();
    }
  }
  element.querySelector('button')?.addEventListener('click', () => close());
  element.addEventListener('click', function (evt) {
    if (evt.target === this) {
      close();
    }
  }
  );
  document.addEventListener('keydown', onDocumentEscapeKeydown);
};

const onDownloadFail = () => renderDownloadNotification(errorDownloadElement);
const onUploadFail = (message = null) => {
  openUploadNotification(errorUploadElement);
  const errorBlock = document.querySelector('.error__title');

  if (errorBlock) {
    errorBlock.textContent = message ? message : NOTIFICATON.MESSAGE.FAILED_FILE_UPLOAD;
  }
};
const onUploadSuccess = () => openUploadNotification(successUploadElement);

export {
  onDownloadFail,
  onUploadFail,
  onUploadSuccess
};
