import { generatePhotosList } from './data.js';

const pictureList = generatePhotosList();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureFragment = document.createDocumentFragment();

pictureList.forEach(({ url, description, likes, comments }) => {
  const pictureClone = pictureTemplate.cloneNode(true);
  const pictureImage = pictureClone.querySelector('.picture__img');
  pictureImage.src = url;
  pictureImage.alt = description;
  pictureClone.querySelector('.picture__likes').textContent = `${likes}`;
  pictureClone.querySelector('.picture__comments').textContent = `${comments.length}`;
  pictureFragment.append(pictureClone);
});

export {
  pictureFragment
};


