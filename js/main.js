import { transformArrayToObject } from './util.js';
// import { generatePhotosList } from './data.js';
import { getData } from './api.js';
import { renderGallery } from './gallery.js';
import { renderPreview } from './picture-detail.js';
import { initUploadForm } from './form.js';
import { validateUploadForm } from './validate-form.js';
import { hideSlider } from './image-effects.js';
import { onDownloadFail } from './notifications.js';

(async () => {
  const pictures = await getData(onDownloadFail);
  if (pictures) {
    renderGallery(pictures);
    renderPreview(transformArrayToObject(pictures));
  }
  initUploadForm();
  hideSlider();
  validateUploadForm();
})();

