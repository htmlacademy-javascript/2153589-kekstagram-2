const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (pictureList) => {
  const pictureFragment = document.createDocumentFragment();

  pictureList.forEach(({ id, url, description, likes, comments }) => {
    const pictureClone = pictureTemplate.cloneNode(true);
    const image = pictureClone.querySelector('.picture__img');

    image.src = url;
    image.alt = description;
    pictureClone.querySelector('.picture__likes').textContent = likes;
    pictureClone.querySelector('.picture__comments').textContent = comments.length;
    pictureClone.href = url;
    pictureClone.dataset.id = id;

    pictureFragment.append(pictureClone);
  });

  pictures.append(pictureFragment);
};

export {
  renderPictures
};


