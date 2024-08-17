const picture = document.querySelector('.big-picture');
const close = document.querySelector('.big-picture__cancel');
const gallery = document.querySelector('.pictures');

// Функция по созданию комментария
const createCommenNode = (comment) => {
  const node = document.createElement('li');
  node.classList.add('social__comment');

  const image = document.createElement('img');
  image.width = 35;
  image.height = 35;
  image.classList.add('social__picture');
  image.src = comment.avatar;
  image.alt = comment.name;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;

  node.append(image);
  node.append(text);

  return node;
};

// Функция закрытия полноэкранного изображения фото
const closeBigPicture = () => {
  picture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  close.removeEventListener('click', closeBigPicture);
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
});

// Функция по созданию контента при полноэкраном отображении фото
const createBigPicture = (pictureData, commentsStep = 5) => {
  close.addEventListener('click', closeBigPicture);
  picture.classList.remove('hidden');
  const commentsContainer = picture.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  const commentsLoader = picture.querySelector('.comments-loader');
  commentsLoader.classList.remove('hidden');
  picture.querySelector('.big-picture__img img').src = pictureData.url;
  picture.querySelector('.social__caption').textContent = pictureData.description;
  picture.querySelector('.likes-count').textContent = pictureData.likes;
  picture.querySelector('.social__comment-total-count').textContent = pictureData.comments.length;
  let diff = 0;

  const addComments = () => {
    const commentCountContainer = picture.querySelector('.social__comment-count');
    const commentList = pictureData.comments;

    if (commentList.length === 0) {
      commentsContainer.innerHTML = '<p class="comments-message-empty">Комментариев нет</p>';
      commentCountContainer.classList.add('hidden');
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', addComments);
      return;
    }
    commentsContainer.innerHTML = '';
    commentCountContainer.classList.remove('hidden');
    diff = (commentsContainer.children.length + diff) >= commentList.length ? commentList.length : diff + commentsStep;
    const commentFragment = document.createDocumentFragment();

    commentList.slice(0, diff).forEach((item) => {
      const comment = createCommenNode(item);
      commentFragment.append(comment);
    });

    commentsContainer.append(commentFragment);
    picture.querySelector('.social__comment-shown-count').textContent = commentsContainer.children.length;

    if (commentsContainer.children.length >= commentList.length) {
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', addComments);
    } else {
      commentsLoader.classList.remove('hidden');
    }
  };

  addComments();
  commentsLoader.addEventListener('click', addComments);
  document.body.classList.add('modal-open');
};

// Функция по создания обработчика для полноэкранного показа фото
const renderPreview = (keyPictureData) => {
  gallery.addEventListener('click', (evt) => {
    const parent = evt.target.closest('.picture');
    if (parent) {
      evt.preventDefault();// ЕСЛИ УБРАТЬ ИЗ БЛОКА IF, ПРОПАДАЕТ СТАНДАРТНОЕ ПОВЕДЕНИЕ INPUT-TYPE-FILE
    } else {
      return;
    }

    const targetId = parent.dataset.id;

    if (!targetId) {
      return;
    }

    const data = keyPictureData[targetId];
    createBigPicture(data);
  });
};

export {
  renderPreview
};

