const comments = document.querySelector('.social__comments');
comments.innerHTML = '';

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

const renderCommentList = (commentList, count = -1) => {
  const commentFragment = document.createDocumentFragment();

  commentList.slice(0, count).forEach((item) => {
    const comment = createCommenNode(item);
    commentFragment.append(comment);
  });

  comments.append(commentFragment);
};

export {
  renderCommentList
};


