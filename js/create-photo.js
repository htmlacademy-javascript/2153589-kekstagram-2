import { getSettings, getPhotoDescriptions } from './data.js';
import { getRandomInteger, getRandomArrayElement, createId } from './util.js';
import { createComment } from './create-comment.js';

const createPhotoId = createId();

const createPhoto = () => {
  const id = createPhotoId();

  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(getPhotoDescriptions()),
    likes: getRandomInteger(getSettings().LIKES_MIN_COUNT, getSettings().LIKES_MAX_COUNT),
    comments: Array.from({ length: getRandomInteger(getSettings().COMMENTS_MIN_COUNT, getSettings().COMMENTS_MAX_COUNT) }, createComment)
  };
};

export {
  createPhoto
};
