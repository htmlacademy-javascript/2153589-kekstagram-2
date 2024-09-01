const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const METHOD = {
  GET: 'GET',
  POST: 'POST',
};

const load = async (route, onFail, onSuccess = null, method = METHOD.GET, body = null, resetData = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {
      method,
      body
    });

    if (!response.ok) {
      onFail();
      return;
    }

    const data = await response.json();

    if (onSuccess) {
      onSuccess();
      resetData();
    }

    return data;
  } catch (err) {
    onFail();
  }
};

const getData = (onFail) => load(ROUTE.GET_DATA, onFail);

const sendData = (body, onFail, onSuccess, resetData) => load(ROUTE.SEND_DATA, onFail, onSuccess, METHOD.POST, body, resetData);

export { getData, sendData };
