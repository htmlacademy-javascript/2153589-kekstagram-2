import { transformArrayToObject } from './util.js';
import { generatePhotosList } from './data.js';
import { renderPictures } from './gallery.js';
import { renderPreview } from './picture-detail.js';

const pictures = generatePhotosList();
renderPictures(pictures);

const picturesObject = transformArrayToObject(pictures);
renderPreview(picturesObject);


