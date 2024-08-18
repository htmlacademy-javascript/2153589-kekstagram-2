import { isEscapeKeyDown } from './util';

const picture = document.querySelector('.big-picture');
const commentsContainer = picture.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const closeButton = document.querySelector('.big-picture__cancel');
const gallery = document.querySelector('.pictures');
const commentCountContainer = picture.querySelector('.social__comment-count');
const commentsLoader = picture.querySelector('.comments-loader');
let addCommentsHandler = null;

// Функция по созданию комментария
const createCommenNode = (comment) => {
  const node = commentTemplate.cloneNode(true);
  const image = node.querySelector('.social__picture');
  image.src = comment.avatar;
  image.alt = comment.name;
  node.querySelector('.social__text').textContent = comment.message;
  return node;
};

// Функция по отрисовке списка комментариев
const renderComments = (commentList, start = 0, commentsStep = 5) => () => {
  if (commentList.length === 0) {
    commentsContainer.innerHTML = '<p class="comments-message-empty">Комментариев нет</p>';
    commentCountContainer.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    return;
  }
  commentsContainer.innerHTML = '';
  commentCountContainer.classList.remove('hidden');
  start = (commentsContainer.children.length + start) >= commentList.length ? commentList.length : start + commentsStep;
  const commentFragment = document.createDocumentFragment();

  commentList.slice(0, start).forEach((item) => {
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

// Функция закрытия полноэкранного изображения фото
const closePictureHandler = () => {
  picture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closePictureHandler);
  document.removeEventListener('keydown', escapeKeydownHandler);
  commentsLoader.removeEventListener('click', addCommentsHandler);
};

// Функция-обработчик клика по клавише Escape
function escapeKeydownHandler(evt) {
  if (isEscapeKeyDown(evt)) {
    closePictureHandler();
  }
}

// Функция по созданию контента при полноэкраном отображении фото
const createBigPicture = (pictureData) => {
  picture.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  commentsContainer.innerHTML = '';
  picture.querySelector('.big-picture__img img').src = pictureData.url;
  picture.querySelector('.social__caption').textContent = pictureData.description;
  picture.querySelector('.likes-count').textContent = pictureData.likes;
  picture.querySelector('.social__comment-total-count').textContent = pictureData.comments.length;

  addCommentsHandler = renderComments(pictureData.comments);
  addCommentsHandler();
  commentsLoader.addEventListener('click', addCommentsHandler);

  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closePictureHandler);
  document.addEventListener('keydown', escapeKeydownHandler);
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

