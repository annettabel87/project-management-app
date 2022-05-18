const setUserToken = (token: string) => {
  if (token) sessionStorage.setItem('tokenAuthorization', token);
};

const getUserToken = () => {
  return sessionStorage.getItem('tokenAuthorization');
};

const removeUserToken = () => {
  return sessionStorage.removeItem('tokenAuthorization');
};

const tokenActions = {
  setUserToken,
  getUserToken,
  removeUserToken,
};

export default tokenActions;
