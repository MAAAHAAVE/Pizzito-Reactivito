import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App.tsx';

import { store } from './redux/store';

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
  );
}
