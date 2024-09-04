const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const METHOD = {
  GET: 'GET',
  POST: 'POST',
};

const load = async (route, method = METHOD.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {
      method,
      body
    });

    if (!response.ok) {
      throw new Error('Ошибка получения данных с сервера!');
    }

    return await response.json();
  } catch (err) {
    throw new Error('Отсутствует соединение с сервером!');
  }
};

const getData = () => load(ROUTE.GET_DATA);

const sendData = (body) => load(ROUTE.SEND_DATA, METHOD.POST, body);

export { getData, sendData };
