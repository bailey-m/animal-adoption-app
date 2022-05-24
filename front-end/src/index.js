import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

export let API_URL;
if(process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:8080';
} else {
    API_URL = 'https://backend-dot-animal-adoption-app-347718.uc.r.appspot.com';
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));