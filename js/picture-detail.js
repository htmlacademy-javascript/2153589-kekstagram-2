import { isEscapeKeyDown } from './util';

const gallery = document.querySelector('.pictures');
const preview = document.querySelector('.big-picture');
const previewShownComments = preview.querySelector('.social__comment-shown-count');
const commentsContainer = preview.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const closeButton = document.querySelector('.big-picture__cancel');
const commentCountContainer = preview.querySelector('.social__comment-count');
const commentsLoader = preview.querySelector('.comments-loader');

let comments = [];
const commentsStep = 5;

// Функция получения потомков preview
const getPreviewChildren = () => ({
  previewImage: preview.querySelector('.big-picture__img img'),
  previewCaption: preview.querySelector('.social__caption'),
  previewLikes: preview.querySelector('.likes-count'),
  previewTotalComments: preview.querySelector('.social__comment-total-count')
});

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
const setNoCommentsContent = () => {
  commentsContainer.innerHTML = '<p class="comments-message-empty">Комментариев нет</p>';
  commentCountContainer.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

// Функция по отрисовке списка комментариев
const renderComments = () => {
  if (comments.length === 0) {
    setNoCommentsContent();
    return;
  }

  const prevLegth = commentsContainer.children.length;
  commentCountContainer.classList.remove('hidden');
  const end = (prevLegth + commentsStep) >= comments.length ? comments.length : prevLegth + commentsStep;

  createCommentList(prevLegth, end);
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
  document.removeEventListener('keydown', escapeKeydownHandler);
  commentsLoader.removeEventListener('click', renderComments);
};

// Функция-обработчик клика по клавише Escape
function escapeKeydownHandler(evt) {
  evt.preventDefault();
  if (isEscapeKeyDown(evt)) {
    closePreview();
  }
}

// Функция по установке общих параметров при вызове полноэкранного изображения
const setPreviewFeatures = () => {
  preview.classList.remove('hidden');
  commentsContainer.innerHTML = '';
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closePreview);
  document.addEventListener('keydown', escapeKeydownHandler);
};

// Функция по созданию контента при полноэкраном отображении фото
const createBigPicture = (pictureData) => {
  const { previewImage, previewCaption, previewLikes, previewTotalComments } = getPreviewChildren();

  setPreviewFeatures();
  previewImage.src = pictureData.url;
  previewCaption.textContent = pictureData.description;
  previewLikes.textContent = pictureData.likes;
  previewTotalComments.textContent = pictureData.comments.length;
  comments = [...pictureData.comments];

  renderComments();
  commentsLoader.addEventListener('click', renderComments);
};

// Функция по создания обработчика для полноэкранного показа фото
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

