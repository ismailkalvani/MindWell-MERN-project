import API from '../api';

const getUsers = () => {
  return API.get('/users');
};

const createUser = (userData) => {
  return API.post('/users', userData);
};

export default {
  getUsers,
  createUser,
};
