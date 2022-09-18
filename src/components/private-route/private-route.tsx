import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivatRouteProps = {
  children: JSX.Element,
  authorizationStatus: AuthorizationStatus
}

function PrivatRoute({children, authorizationStatus}: PrivatRouteProps): JSX.Element {

  // eslint-disable-next-line no-console
  console.log(authorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivatRoute;
