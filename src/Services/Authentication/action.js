import {
  TOGGLE_LOGIN,
  TOGGLE_FAILED,
  TOGGLE_SUCCESS,
  VIDEOS_DATA,
} from './constant';
import config from '../../config/env';
export const toggleLogin = (realm, username, password) => dispatch => {
  if (realm[0].username === username && realm[0].password === password) {
    dispatch({
      type: TOGGLE_LOGIN,
    });
  } else {
    dispatch({
      type: TOGGLE_FAILED,
    });
  }
};
export const toggleSuccess = () => dispatch => {
  dispatch({
    type: TOGGLE_SUCCESS,
  });
};

export const fetchVideosApi = () => dispatch => {
  let apiConfig = config.apiURl;
  let baseUrl = config.baseURL;
  fetch(apiConfig, {
    method: 'GET',
  })
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      dispatch({
        type: VIDEOS_DATA,
        data: responseJson,
      });
    });
};
