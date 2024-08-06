import { getSettings, getCommentMessages, getCommentAuthors } from './data.js';
import { getRandomInteger, getRandomArrayElement, createId } from './util.js';

const createCommentId = createId();

const createComment = () => {
  const authorId = getRandomInteger(1, getSettings().COMMENT_AUTHORS_MAX_COUNT);
  const sentencesCount = getRandomInteger(1, 2);
  const messageKey = getRandomArrayElement(Object.keys(getCommentMessages()));
  const message = (sentencesCount === 2 && messageKey === 'neutral') ? `${getCommentMessages()[messageKey]} ${getRandomArrayElement(getCommentMessages()['bad'])}` : getRandomArrayElement(getCommentMessages()[messageKey]);

  return {
    id: createCommentId(),
    avatar: `img/avatar-${authorId}.svg`,
    message,
    name: getCommentAuthors()[authorId]?.name,
  };
};

export { createComment };
