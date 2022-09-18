import {BrowserHistory} from 'history';
import {useLayoutEffect, useState} from 'react';
import { Router } from 'react-router-dom';

export interface HistoryRouterProps {
  history: BrowserHistory,
  baseName?: string,
  children?: React.ReactNode
}

function HistoryRouter({history, baseName, children}: HistoryRouterProps) {

  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router basename={baseName} location={state.location} navigationType={state.action} navigator={history}>
      {children}
    </Router>
  );
}

export default HistoryRouter;
