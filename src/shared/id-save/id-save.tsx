const setUserId = (id: string) => {
  if (id) localStorage.setItem('idAuthorization', id);
};

const getUserId = () => {
  return localStorage.getItem('idAuthorization');
};

const removeUserId = () => {
  return localStorage.removeItem('idAuthorization');
};

const saveId = {
  setUserId,
  getUserId,
  removeUserId,
};

export default saveId;
