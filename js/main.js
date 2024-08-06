import { getSettings } from './data.js';
import { createPhoto } from './create-photo.js';

const generatePhotosList = (length) => Array.from({ length }, createPhoto);

generatePhotosList(getSettings().DESCRIPTION_MAX_COUNT);
