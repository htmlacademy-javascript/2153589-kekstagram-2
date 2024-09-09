import { API, NOTIFICATON } from './constants.js';

const load = async (route, method = API.METHOD.GET, body = null) => {
  try {
    const response = await fetch(`${API.BASE_URL}${route}`, {
      method,
      body
    });

    if (!response.ok) {
      throw new Error(NOTIFICATON.MESSAGE.NO_DATA_ERROR);
    }

    return await response.json();
  } catch (err) {
    throw new Error(NOTIFICATON.MESSAGE.NO_CONNECTION);
  }
};

const getData = () => load(API.ROUTE.GET_DATA);

const sendData = (body) => load(API.ROUTE.SEND_DATA, API.METHOD.POST, body);

export { getData, sendData };
