const DESCRIPTION_MAX_COUNT = 25;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const COMMENTS_MIN_COUNT = 0;
const COMMENTS_MAX_COUNT = 30;
const COMMENT_AUTHORS_MAX_COUNT = 6;

// Список возможных вариантов текста комментария
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

// Список возможных вариантов описания фото
const photoDescriptions = [
  'Момент вечности', 'Ловлю мгновение', 'Красота в каждом кадре', 'Магия момента', 'Мир, созданный изображением', 'История без слов', 'Эмоции в фокусе', 'Одно мгновение, тысячи впечатлений', 'Когда фото говорит больше слов', 'Вдохновение сквозь объектив', 'Мир глазами фотографа', 'Фотография – это язык сердца', 'Моменты, которые запоминаются', 'Фотография, чтобы запомнить'
];

// Список различных имен людей
const commentAuthors = {
  '1': { name: 'Виктор' },
  '2': { name: 'Кирилл' },
  '3': { name: 'Игорь' },
  '4': { name: 'Мария' },
  '5': { name: 'Татьяна' },
  '6': { name: 'Наталья' },
};


// Функция - генерация случайного числа в диапазоне
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// Функция - выбор случайного элемента в массиве
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция - генерация уникального id
const createId = () => {
  let id = 0;

  return () => ++id;
};

// Создание уникальных id для различных сущностей
const createCommentId = createId();
const createDescriptionId = createId();

// Функция - создание комментария
const createComment = () => {
  const authorId = getRandomInteger(1, COMMENT_AUTHORS_MAX_COUNT);
  const sentencesCount = getRandomInteger(1, 2);
  let message = '';
  const messageKey = getRandomArrayElement(Object.keys(commentMessages));

  switch (messageKey) {
    case 'neutral':
      message = (sentencesCount === 2) ? `${commentMessages[messageKey]} ${getRandomArrayElement(commentMessages['bad'])}` : getRandomArrayElement(commentMessages[messageKey]);
      break;
    default:
      message = getRandomArrayElement(commentMessages[messageKey]);
  }

  return {
    id: createCommentId(),
    avatar: `img/avatar-${authorId}.svg`,
    message,
    name: commentAuthors[authorId]?.name,
  };
};

// Функция - создание описания фото
const createPhotoProperties = () => {
  const id = createDescriptionId();

  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(photoDescriptions),
    likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
    comments: Array.from({ length: getRandomInteger(COMMENTS_MIN_COUNT, COMMENTS_MAX_COUNT) }, createComment)
  };
};

// Функция - генерация списка описаний фото
const generatePhotosList = (length) => Array.from({ length }, createPhotoProperties);

generatePhotosList(DESCRIPTION_MAX_COUNT);

