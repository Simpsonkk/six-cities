import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivatRouteProps = {
  children: JSX.Element,
  authorizationStatus: AuthorizationStatus
}

function PrivatRoute(props: PrivatRouteProps): JSX.Element {
  const {children, authorizationStatus} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivatRoute;
