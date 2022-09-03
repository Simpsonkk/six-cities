import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { rooms } from './mocks/offers';
import { reviews } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App roomList={rooms} reviews={reviews} />
  </React.StrictMode>
);
