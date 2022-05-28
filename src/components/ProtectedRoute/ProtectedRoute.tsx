import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTERS } from '../../constants/constants';
import { localStorageActions } from '../../utils/localStorageActions';

const ProtectedRoute: FC<{ children?: JSX.Element }> = ({ children }) => {
  const auth = !!localStorageActions.getToken();

  if (!auth) {
    return <Navigate to={ROUTERS.LOGIN} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
