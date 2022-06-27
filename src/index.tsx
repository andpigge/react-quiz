import React, { StrictMode } from 'react';
import ReactDom from 'react-dom';
import './main.scss';
import App from './components';

ReactDom.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById('root'),
);
