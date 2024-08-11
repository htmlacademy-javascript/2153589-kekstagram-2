import { generatePhotosList } from './data.js';
import { renderPictures } from './pictures.js';

const pictures = generatePhotosList();
renderPictures(pictures);

