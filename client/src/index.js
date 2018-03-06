import 'react-materialize';
import './custom.css';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(<App
    COGNITO_APP_ID='23q08taipsqnc257mpinu7chcj'
    USER_POOL_ID='eu-west-2_BmTJxzD8N'
    IDENTITY_POOL_ID='eu-west-2:8d0fd92c-d085-4a74-98c8-1fef8c18d3e4'
    GOOGLE_API_KEY='AIzaSyBQi4BxTf1DMgJsQhuX8louSRU2R0NTxl0'
    API='https://api.staging.carefreebreaks.com'
/>, document.querySelector('#root'));
