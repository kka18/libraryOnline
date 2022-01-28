import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import './index.css';
import App from './containers/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const store = configureStore();

ReactDOM.render(
<Provider store={store}>
  <React.Fragment>
    <App />
  </React.Fragment>
</Provider>,
  document.getElementById('root')
);