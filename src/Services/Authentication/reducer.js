import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  TOGGLE_SUCCESS,
  TOGGLE_SPLASH,
  GMAIL_SIGN_IN,
} from './constant';
const initialState = {
  GmailUsername: '',
  isLoading: 0,
  isSuccess: 0,
  token: null,
  storeAcess: '',
  searchData: '',
  isSearching: false,
  isStore: false,
  isConceptLoading: true,
  conceptData: '',
  dpUrl: '',
};
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {...state, isLoading: 1};
    case LOGIN_FAILED:
      return {...state, isSuccess: 2, isLoading: 0};
    case LOGIN_SUCCESS:
      return {
        ...state,
        isSuccess: 1,
        isLoading: 0,
        token: action.data,
      };
    case TOGGLE_SUCCESS:
      return {
        ...state,
        isSuccess: 0,
        isLoading: 0,
      };
    case TOGGLE_SPLASH:
      return {
        ...state,
        token: action.data,
      };
    case GMAIL_SIGN_IN:
      return {
        ...state,
        isSuccess: 1,
        isLoading: 0,
        token: action.data[0],
        GmailUsername: action.data[1].name,
        dpUrl: action.data[1].photo,
      };
    default:
      return state;
  }
};

export default homeReducer;
