const setUserPassword = (password: string) => {
  if (password) localStorage.setItem('passwordAuthorization', password);
};

const getUserPassword = () => {
  return localStorage.getItem('passwordAuthorization');
};

const removeUserPassword = () => {
  return localStorage.removeItem('passwordAuthorization');
};

const savePassword = {
  setUserPassword,
  getUserPassword,
  removeUserPassword,
};

export default savePassword;
