import 'react-materialize';
import './custom.css';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(
  <App
    COGNITO_APP_ID={process.env.REACT_APP_COGNITO_APP_ID}
    USER_POOL_ID={process.env.REACT_APP_USER_POOL_ID}
    IDENTITY_POOL_ID={process.env.REACT_APP_IDENTITY_POOL_ID}
    GOOGLE_API_KEY={process.env.REACT_APP_GOOGLE_API_KEY}
    API={process.env.REACT_APP_API}
  />,
  document.querySelector('#root')
);
