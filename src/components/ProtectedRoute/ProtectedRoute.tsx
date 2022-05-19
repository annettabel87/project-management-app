import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import tokenActions from '../../api/token-actions/token-actions';
import { ROUTERS } from '../../constants/constants';

const ProtectedRoute: FC<{ children?: JSX.Element }> = ({ children }) => {
  const auth = tokenActions.getUserToken() ? true : false;

  if (!auth) {
    return <Navigate to={ROUTERS.LOGIN} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
