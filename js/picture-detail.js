const picture = document.querySelector('.big-picture');
const close = document.querySelector('.big-picture__cancel');
const gallery = document.querySelector('.pictures');

const createCommenNode = (obj) => {
  const node = document.createElement('li');
  node.classList.add('social__comment');

  const image = document.createElement('img');
  image.width = 35;
  image.height = 35;
  image.classList.add('social__picture');
  image.src = obj.avatar;
  image.alt = obj.name;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = obj.message;

  node.append(image);
  node.append(text);

  return node;
};

const closeBigPicture = () => {
  picture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

close.addEventListener('click', closeBigPicture);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
});

const renderBigPicture = (pictureData) => {
  picture.classList.remove('hidden');
  const commentsContainer = picture.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  const commentsLoader = picture.querySelector('.comments-loader');
  commentsLoader.classList.remove('hidden');
  picture.querySelector('.big-picture__img img').src = pictureData.url;
  picture.querySelector('.social__caption').textContent = pictureData.description;
  picture.querySelector('.likes-count').textContent = pictureData.likes;
  picture.querySelector('.social__comment-total-count').textContent = pictureData.comments.length;
  let step = 0;
  const addComments = () => {
    const commentCountContainer = picture.querySelector('.social__comment-count');
    const commentList = pictureData.comments;

    if (commentList.length === 0) {
      commentsContainer.innerHTML = '<p class="comments-message-empty">Комментариев нет</p>';
      commentCountContainer.classList.add('hidden');
      commentsLoader.classList.add('hidden');
      return;
    }
    commentsContainer.innerHTML = '';
    commentCountContainer.classList.remove('hidden');
    step = (commentsContainer.children.length + 5) >= commentList.length ? commentList.length : step + 5;
    const commentFragment = document.createDocumentFragment();

    commentList.slice(0, step).forEach((item) => {
      const comment = createCommenNode(item);
      commentFragment.append(comment);
    });

    commentsContainer.append(commentFragment);
    picture.querySelector('.social__comment-shown-count').textContent = commentsContainer.children.length;

    if (commentsContainer.children.length >= commentList.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  };

  addComments();
  commentsLoader.addEventListener('click', addComments);
  document.body.classList.add('modal-open');
};

const renderPreview = (obj) => {
  gallery.addEventListener('click', (evt) => {
    const parent = evt.target.closest('.picture');
    if (parent) {
      evt.preventDefault();
    } else {
      return;
    }

    const targetId = parent.dataset.id;

    if (!targetId) {
      return;
    }

    const data = obj[targetId];
    renderBigPicture(data);
  });
};

export {
  renderPreview
};

