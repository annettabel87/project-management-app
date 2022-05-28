const setToken = (token: string) => {
  if (token) localStorage.setItem('token', token);
};

const getToken = () => {
  return localStorage.getItem('token');
};

const removeToken = () => {
  return localStorage.removeItem('token');
};

const setLoginData = (data: { [key: string]: string }) => {
  localStorage.setItem('loginData', JSON.stringify(data));
};

const getLoginData = () => {
  const data = localStorage.getItem('loginData');
  return data && JSON.parse(data);
};

const removeLoginData = () => {
  return localStorage.removeItem('loginData');
};

const setCurrentUser = (id: string, data: { [key: string]: string }) => {
  console.log(data);
  localStorage.setItem('currentUser', JSON.stringify({ id: id, ...data }));
};

const getCurrentUser = () => {
  const data = localStorage.getItem('currentUser');
  return data && JSON.parse(data);
};

const updateCurrentUser = (
  prevData: { [key: string]: string },
  data: { [key: string]: string }
) => {
  localStorage.setItem('currentUser', JSON.stringify({ ...prevData, ...data }));
};

const removeCurrentUser = () => {
  return localStorage.removeItem('currentUser');
};

export const localStorageActions = {
  setLoginData,
  getLoginData,
  removeLoginData,
  setCurrentUser,
  getCurrentUser,
  updateCurrentUser,
  removeCurrentUser,
  setToken,
  getToken,
  removeToken,
};
