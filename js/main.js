import { transformArrayToObject } from './util.js';
import { generatePhotosList } from './data.js';
import { renderGallery } from './gallery.js';
import { renderPreview } from './picture-detail.js';
import { getUploadFormHandler } from './form.js';
import { validateUploadForm } from './validate-form.js';

const pictures = generatePhotosList();
renderGallery(pictures);
renderPreview(transformArrayToObject(pictures));
getUploadFormHandler();
validateUploadForm();


