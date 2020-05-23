import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  STORE_ACCESS,
  STORE_SEARCH,
  STORE_CONCEPT,
  TOGGLE_SUCCESS,
  TOGGLE_SPLASH,
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
  let apiConfig = config.apiURl;
  let pageURL = config.apiConfig.authenticationApi.loginUserHandle;
  dispatch({
    type: LOGIN_START,
  });
  fetch(apiConfig + pageURL, {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(response => {
    if (!(response.status === 200)) {
      //   Alert.alert('wrong credentials');
      dispatch({
        type: LOGIN_FAILED,
        data: {flag: false},
      });
    } else {
      var temp = response.headers.map.authorization.split(' ');
      dispatch({
        type: LOGIN_SUCCESS,
        data: {header: temp[1], flag: false},
      });
    }
  });
};
export const toggleSplash = () => async dispatch => {
  try {
    const value = await AsyncStorage.getItem('token');
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
export const toggleStore = header => dispatch => {
  let apiConfig = config.apiURl;
  let storeURL = config.apiConfig.tempStoreApi.storeListHandle;
  fetch(apiConfig + storeURL, {
    method: 'GET',
    headers: {
      Authorization: header,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: STORE_ACCESS,
        data: responseJson,
        // navigation.navigate('StoreList', {storeData: this.state.storeData});
      });
    });
};

export const toggleSearch = (header, newApi) => dispatch => {
  fetch(newApi, {
    method: 'GET',
    headers: {
      Authorization: header,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: STORE_SEARCH,
        data: responseJson,
        // navigation.navigate('StoreList', {storeData: this.state.storeData});
      });
    });
};
export const toggleConcept = header => dispatch => {
  let apiConfig = config.conceptURL;
  let conceptsURL = config.apiConfig.tempStoreApi.conceptListHandle;
  fetch(apiConfig + conceptsURL, {
    method: 'GET',
    headers: {
      Authorization: header,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: STORE_CONCEPT,
        data: responseJson,
        // navigation.navigate('StoreList', {storeData: this.state.storeData});
      });
    });
};
