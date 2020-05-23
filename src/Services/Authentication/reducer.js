import {
  TOGGLE_FLAG,
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  STORE_ACCESS,
  STORE_SEARCH,
  STORE_CONCEPT,
  TOGGLE_SUCCESS,
  TOGGLE_SPLASH,
} from './constant';
const initialState = {
  isLoading: 0,
  isSuccess: 0,
  token: null,
  storeAcess: '',
  searchData: '',
  isSearching: false,
  isStore: false,
  isConceptLoading: true,
  conceptData: '',
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
    case STORE_ACCESS:
      return {
        ...state,
        isStore: true,
        storeAcess: action.data,
      };
    case STORE_SEARCH:
      return {
        ...state,
        searchData: action.data,
        isSearching: true,
      };
    case STORE_CONCEPT:
      return {
        ...state,
        conceptData: action.data,
        isConceptLoading: false,
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
    default:
      return state;
  }
};

export default homeReducer;
