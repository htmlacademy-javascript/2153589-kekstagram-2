import { arrayToObject } from './util.js';
import { generatePhotosList } from './data.js';
import { renderPictures } from './pictures.js';
import { renderBigPicture } from './picture-detail.js';
import { renderCommentList } from './comments.js';

const pictures = generatePhotosList();
renderPictures(pictures);

const picturesObject = arrayToObject(pictures);
renderBigPicture(picturesObject, renderCommentList);


