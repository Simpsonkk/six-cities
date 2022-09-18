import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from './../header/header';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray">
      <Header/>
      <div className="container">
        <h1>404. Page not found</h1>
        <Link to={AppRoute.Main} className="button">Back to main page</Link>
      </div>
    </div>
  );
}

export default NotFoundScreen;
