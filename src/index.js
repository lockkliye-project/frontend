import React from 'react';
import ReactDOM from 'react-dom/client';

import Application from './components/Application/Application';

import reportWebVitals from './reportWebVitals';

import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// document.addEventListener('contextmenu', (event) => {
// 	event.preventDefault();
// });

root.render(
	<React.StrictMode>
		<Application />
	</React.StrictMode>
);

// reportWebVitals(console.log);
