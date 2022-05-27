const setUserLogin = (login: string) => {
  if (login) localStorage.setItem('loginAuthorization', login);
};

const getUserLogin = () => {
  return localStorage.getItem('loginAuthorization');
};

const removeUserLogin = () => {
  return localStorage.removeItem('loginAuthorization');
};

const saveLogin = {
  setUserLogin,
  getUserLogin,
  removeUserLogin,
};

export default saveLogin;
