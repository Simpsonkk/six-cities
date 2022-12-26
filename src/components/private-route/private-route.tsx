import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';

type PrivatRouteProps = {
  children: JSX.Element;
  authStatus: AuthorizationStatus;
};

function PrivatRoute({
  children,
  authStatus,
}: PrivatRouteProps): JSX.Element {
  return authStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivatRoute;
