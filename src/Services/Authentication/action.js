import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  TOGGLE_SUCCESS,
  TOGGLE_SPLASH,
  GMAIL_SIGN_IN,
} from './constant';
import AsyncStorage from 'react-native';
import config from '../../config/env';
export const toggleSuccess = () => dispatch => {
  dispatch({
    type: TOGGLE_SUCCESS,
  });
};

export const signUpUser = (username, password, email, socialId) => dispatch => {
  let signUpUrl = config.apiConfig.createApi.createUser;
  dispatch({
    type: LOGIN_START,
  });
  fetch(signUpUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
      socialId: socialId,
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === true) {
        dispatch({
          type: LOGIN_SUCCESS,
          data: responseJson.body,
        });
      }
    });
};
export const loginUser = (username, password) => dispatch => {
  let loginUrl = config.apiConfig.authenticationApi.loginUserHandle;
  dispatch({
    type: LOGIN_START,
  });
  fetch(loginUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === true) {
        dispatch({
          type: LOGIN_SUCCESS,
          data: responseJson.id,
        });
      } else {
        dispatch({
          type: LOGIN_FAILED,
        });
      }
    });
};
export const getNotes = () => async dispatch => {
  // console.warn('called');

  const tokenValue = await AsyncStorage.getItem('token');
  // console.warn(tokenValue);

  // eslint-disable-next-line prettier/prettier
  let getNotesUrl = config.apiConfig.fetchDataApi.fetchNotes+tokenValue;
  fetch(getNotesUrl, {
    method: 'GET',
  })
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      console.warn(responseJson);
      // dispatch({
      //   type: NOTES_DATA,
      //   data: responseJson,
      // });
    });
};
export const toggleSplash = () => async dispatch => {
  try {
    const value = await AsyncStorage.getItem('token');
    console.log(value);
    if (value !== null) {
      dispatch({
        type: TOGGLE_SPLASH,
        data: value,
      });
    }
    if (value === null) {
      dispatch({
        type: TOGGLE_SPLASH,
        data: '',
      });
    }
  } catch (error) {
    console.log('error in getting token', error);
  }
};

export const socialSignIn = userinfo => dispatch => {
  console.warn(userinfo);
  let signUpUrl = config.apiConfig.createApi.createUser;
  dispatch({
    type: LOGIN_START,
  });
  fetch(signUpUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username: userinfo.name,
      password: '',
      email: userinfo.email,
      socialId: userinfo.id,
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === true) {
        dispatch({
          type: LOGIN_SUCCESS,
          data: [responseJson.body, userinfo],
        });
      }
    });
};
