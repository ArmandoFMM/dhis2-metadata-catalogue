import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Link
  } from 'react-router-dom';
  import createBrowserHistory from 'history/createBrowserHistory'
  
  const history = createBrowserHistory()
  

ReactDOM.render(
    <Provider store={configureStore()}>
        <Router  history={history}>
            <App />
        </Router>
    </Provider>,document.getElementById('root'));
registerServiceWorker();
