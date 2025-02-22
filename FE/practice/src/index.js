import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
		<RecoilRoot>
			<CookiesProvider>
				<App />
			</CookiesProvider>
		</RecoilRoot>
	// </React.StrictMode>
);

reportWebVitals();
