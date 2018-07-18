import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Amplify from 'aws-amplify';

import config from './aws-exports';

import App from './App';

import './index.css';

Amplify.configure(config);

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
