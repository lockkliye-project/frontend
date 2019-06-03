import React from 'react';
import ReactDOM from 'react-dom';

import Notifications from './components/Notifications/Notifications';
import Application from './components/Application/Application';

import * as serviceWorker from './services/serviceWorker';

import './style/index.css';

ReactDOM.render(
	<React.Fragment>
		<Notifications />
		<Application />
	</React.Fragment>,
	document.getElementById('root')
);

serviceWorker.unregister();
