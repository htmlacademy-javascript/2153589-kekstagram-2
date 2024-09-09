// API
const API = {
  ROUTE: {
    GET_DATA: '/data',
    SEND_DATA: '/',
  },
  METHOD: {
    GET: 'GET',
    POST: 'POST',
  },
  BASE_URL: 'https://31.javascript.htmlacademy.pro/kekstagram'
};

// FILTER
const FILTER = {
  TYPE: {
    DEFAULT: 'filter-default',
    RANDOM: 'filter-random',
    DISCUSSED: 'filter-discussed'
  },
  RANDOM_SIZE: 10,
  ACTIVE_BUTTON_CLASS: 'img-filters__button--active'
};

// NOTIFICATIONS
const NOTIFICATON = {
  REMOVE_TIMEOUT: 5000,
  MESSAGE: {
    WRONG_FILE_EXTENSION: 'Не правильно выбран формат файла',
    FAILED_INITIAL_DOWLOAD: 'Не удалось загрузить данные',
    FAILED_FILE_UPLOAD: 'Ошибка загрузки файла',
    UNKNOWN_FILTER_ID: 'Unknown filter id',
    SUCCESS_FILE_UPLOAD: ' Изображение успешно загружено',
    NO_DATA_ERROR: 'Ошибка получения данных с сервера!',
    NO_CONNECTION: 'Отсутствует соединение с сервером!'
  }
};

// VALIDATE FORM
const VALIDATE = {
  COMMENT_MAX_LENGTH: 140,
  HASHTAG_MAX_COUNT: 5,
  HASHTAG_REGEX: /^#[a-zа-яё0-9]{1,19}$/i,
  WARNING_CLASS: 'img-upload__field-wrapper--warning'
};

const VALIDATE_ERROR_TYPES = {
  'invalidHashtag': 'введён невалидный хэштег',
  'onlyHash': 'после символа # должна быть буква или цифра',
  'manyHashtags': 'превышено количество хэштегов',
  'repeatHashtag': 'хэштеги повторяются',
  'longComment': `длина комментария больше ${VALIDATE.COMMENT_MAX_LENGTH} символов`
};

// PREVIEW
const PREVIEW = {
  FILE_UPLOAD_TYPES: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
  COMMENTS_STEP: 5,
  MAX_SIZE: 100,
  MIN_SIZE: 25,
  RESIZE_STEP: 25,
  BUTTON_SIGN: {
    PROCESS: 'Отправляю...',
    INITIAL: 'Опубликовать'
  },
  EFFECTS: {
    chrome: {
      min: 0,
      max: 1,
      start: 1,
      step: 0.1,
      getEffect: (value) => `grayscale(${value})`
    },
    sepia: {
      min: 0,
      max: 1,
      start: 1,
      step: 0.1,
      getEffect: (value) => `sepia(${value})`
    },
    marvin: {
      min: 0,
      max: 100,
      start: 100,
      step: 1,
      getEffect: (value) => `invert(${value}%)`
    },
    phobos: {
      min: 0,
      max: 3,
      start: 3,
      step: 0.1,
      getEffect: (value) => `blur(${value}px)`
    },
    heat: {
      min: 1,
      max: 3,
      start: 3,
      step: 0.1,
      getEffect: (value) => `brightness(${value})`
    }
  }
};

export {
  API,
  FILTER,
  NOTIFICATON,
  VALIDATE,
  VALIDATE_ERROR_TYPES,
  PREVIEW
};

