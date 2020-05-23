const baseURL = 'https://nodejsapp20.herokuapp.com/api';

const apiConfig = {
  authenticationApi: {
    loginUserHandle: `${baseURL}/authenticate/`,
  },
  fetchDataApi: {
    fetchNotes: `${baseURL}/notes/`,
  },
  createApi: {
    createNotes: `${baseURL}/notes/`,
    createUser: `${baseURL}/users/`,
  },
  deleteData: {
    deleteNote: `${baseURL}/notes/`,
  },
};

export default {
  apiConfig,
  baseURL,
};
