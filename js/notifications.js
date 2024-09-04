import { isEscapeKeydown } from './util.js';

const REMOVE_NOTIFICATION_TIMEOUT = 5000;

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
  }, REMOVE_NOTIFICATION_TIMEOUT);
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
const onUploadFail = () => openUploadNotification(errorUploadElement);
const onUploadSuccess = () => openUploadNotification(successUploadElement);

export {
  onDownloadFail,
  onUploadFail,
  onUploadSuccess
};
