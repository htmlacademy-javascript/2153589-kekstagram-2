import { isEscapeKeydown } from './util.js';

const gallery = document.querySelector('.pictures');
const closeButton = document.querySelector('.big-picture__cancel');
const preview = document.querySelector('.big-picture');
const commentCountContainer = preview.querySelector('.social__comment-count');
const commentsLoader = preview.querySelector('.comments-loader');
const previewImage = preview.querySelector('.big-picture__img img');
const previewCaption = preview.querySelector('.social__caption');
const previewLikes = preview.querySelector('.likes-count');
const previewTotalComments = preview.querySelector('.social__comment-total-count');
const previewShownComments = preview.querySelector('.social__comment-shown-count');
const commentsContainer = preview.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');

let comments = [];
const COMMENTS_STEP = 5;

// Функция по созданию комментария
const createCommentNode = (comment) => {
  const node = commentTemplate.cloneNode(true);
  const image = node.querySelector('.social__picture');
  image.src = comment.avatar;
  image.alt = comment.name;
  node.querySelector('.social__text').textContent = comment.message;

  return node;
};

// Функция по созданию списка комментариев
const createCommentList = (start, end) => {
  const commentFragment = document.createDocumentFragment();

  comments.slice(start, end).forEach((item) => {
    const comment = createCommentNode(item);
    commentFragment.append(comment);
  });

  commentsContainer.append(commentFragment);
};

// Функция по отрисовке контента при отсутствии комментариев
const renderNoCommentsContent = () => {
  commentsContainer.innerHTML = '<p class="comments-message-empty">Комментариев нет</p>';
  commentCountContainer.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

// Функция по отрисовке списка комментариев
const renderComments = () => {
  if (comments.length === 0) {
    renderNoCommentsContent();

    return;
  }

  const prevLength = commentsContainer.children.length;
  commentCountContainer.classList.remove('hidden');

  const end = (prevLength + COMMENTS_STEP) >= comments.length ? comments.length : prevLength + COMMENTS_STEP;

  createCommentList(prevLength, end);
  previewShownComments.textContent = commentsContainer.children.length;

  if (commentsContainer.children.length >= comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

// Функция закрытия полноэкранного изображения фото
const closePreview = () => {
  preview.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closePreview);
  document.removeEventListener('keydown', onEscapeKeydown);
  commentsLoader.removeEventListener('click', renderComments);
};

// Функция-обработчик клика по клавише Escape
function onEscapeKeydown(evt) {
  evt.preventDefault();

  if (isEscapeKeydown(evt)) {
    closePreview();
  }
}

// Функция по установке общих параметров при вызове полноэкранного изображения
const setPreviewFeatures = () => {
  preview.classList.remove('hidden');
  commentsContainer.innerHTML = '';
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closePreview);
  document.addEventListener('keydown', onEscapeKeydown);
};

// Функция по созданию контента при полноэкранном отображении фото
const createBigPicture = (pictureData) => {
  setPreviewFeatures();
  previewImage.src = pictureData.url;
  previewCaption.textContent = pictureData.description;
  previewLikes.textContent = pictureData.likes;
  previewTotalComments.textContent = pictureData.comments.length;
  comments = [...pictureData.comments];

  renderComments();
  commentsLoader.addEventListener('click', renderComments);
};

// Функция по созданию обработчика для полноэкранного показа фото
const renderPreview = (keyPictureData) => {
  gallery.addEventListener('click', (evt) => {
    const parent = evt.target.closest('.picture');
    if (!parent) {
      return;
    }
    evt.preventDefault();
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

