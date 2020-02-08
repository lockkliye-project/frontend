import React from 'react';
import ReactDOM from 'react-dom';

import Notifications from './components/Notifications/Notifications';
import App from './App';

import * as serviceWorker from './api/serviceWorker';

import './style/index.css';

document.addEventListener('contextmenu', event => {
	event.preventDefault();
});

ReactDOM.render(
	<React.Fragment>
		<Notifications />
		<App />
	</React.Fragment>,
	document.getElementById('root')
);

serviceWorker.unregister();
