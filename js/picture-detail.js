const comments = document.querySelector('.social__comments');
const picture = document.querySelector('.big-picture');
const close = document.querySelector('.big-picture__cancel');
const gallery = document.querySelector('.pictures');

const closeBigPicture = () => {
  comments.innerHTML = '';
  picture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

close.addEventListener('click', closeBigPicture);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
});

const renderBigPicture = (obj, cb) => {
  gallery.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();
      const target = obj[evt.target.parentNode.dataset.id];

      picture.classList.remove('hidden');
      picture.querySelector('.big-picture__img img').src = target.url;
      picture.querySelector('.social__caption').textContent = target.description;
      picture.querySelector('.likes-count').textContent = target.likes;
      let shownComments = 0;

      if (target.comments.length === 1) {
        shownComments = 1;
      } else if (target.comments.length > 1) {
        shownComments = 2;
      }

      picture.querySelector('.social__comment-shown-count').textContent = shownComments;
      picture.querySelector('.social__comment-total-count').textContent = target.comments.length;
      //picture.querySelector('.social__comment-count').classList.add('hidden');
      picture.querySelector('.comments-loader').classList.add('hidden');
      document.body.classList.add('modal-open');
      cb(target.comments, shownComments);
    }
  });
};

export {
  renderBigPicture
};

