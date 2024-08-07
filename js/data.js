import { getRandomInteger, getRandomArrayElement, createId } from './util.js';

const settings = {
  LIKES_MIN_COUNT: 15,
  LIKES_MAX_COUNT: 200,
  COMMENTS_MIN_COUNT: 0,
  COMMENTS_MAX_COUNT: 30,
  COMMENT_AUTHORS_MAX_COUNT: 6
};

const commentMessages = {
  good: ['Всё отлично!'],
  neutral: ['В целом всё неплохо. Но не всё.'],
  bad: [
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ]
};

const photoDescriptions = [
  'Момент вечности',
  'Ловлю мгновение',
  'Красота в каждом кадре',
  'Магия момента',
  'Мир, созданный изображением',
  'История без слов',
  'Эмоции в фокусе',
  'Одно мгновение, тысячи впечатлений',
  'Когда фото говорит больше слов',
  'Вдохновение сквозь объектив',
  'Мир глазами фотографа',
  'Фотография – это язык сердца',
  'Моменты, которые запоминаются',
  'Фотография, чтобы запомнить'
];

const commentAuthors = {
  '1': { name: 'Виктор' },
  '2': { name: 'Кирилл' },
  '3': { name: 'Игорь' },
  '4': { name: 'Мария' },
  '5': { name: 'Татьяна' },
  '6': { name: 'Наталья' },
};

const createCommentId = createId();
const createPhotoId = createId();

const createComment = () => {
  const authorId = getRandomInteger(1, settings.COMMENT_AUTHORS_MAX_COUNT);
  const sentencesCount = getRandomInteger(1, 2);
  const messageKey = getRandomArrayElement(Object.keys(commentMessages));
  const message = (sentencesCount === 2 && messageKey === 'neutral') ? `${commentMessages[messageKey]} ${getRandomArrayElement(commentMessages['bad'])}` : getRandomArrayElement(commentMessages[messageKey]);

  return {
    id: createCommentId(),
    avatar: `img/avatar-${authorId}.svg`,
    message,
    name: commentAuthors[authorId]?.name,
  };
};


const createPhoto = () => {
  const id = createPhotoId();

  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(photoDescriptions),
    likes: getRandomInteger(settings.LIKES_MIN_COUNT, settings.LIKES_MAX_COUNT),
    comments: Array.from({ length: getRandomInteger(settings.COMMENTS_MIN_COUNT, settings.COMMENTS_MAX_COUNT) }, createComment)
  };
};

const generatePhotosList = (length = 25) => Array.from({ length }, createPhoto);

export {
  generatePhotosList
};
