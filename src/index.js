import React from 'react';
import ReactDOM from 'react-dom';

import NotificationContainer from './components/NotificationContainer/NotificationContainer';
import Application from './components/Application/Application';

import * as serviceWorker from './services/serviceWorker';

import './style/index.css';

ReactDOM.render(
	<React.Fragment>
		<NotificationContainer />
		<Application />
	</React.Fragment>,
	document.getElementById('root')
);

serviceWorker.unregister();
