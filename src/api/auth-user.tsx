import tokenActions from './token-actions/token-actions';

export const authUser = () => {
  const token = tokenActions.getUserToken();
  if (token) {
    return 'Bearer ' + token;
  } else {
    return '';
  }
};
