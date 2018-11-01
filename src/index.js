import React from 'react';
import ReactDom from 'react-dom';


import {
  BrowserRouter as Router
} from 'react-router-dom';



import {Provider} from 'react-redux';


import configureStore from "./redux/store/configureStore";
import './style/style.scss';

const ROOT = document.getElementById("root");


const store = configureStore;


ReactDom.render(
  <Provider store={store}>
    <Router>
    </Router>
  </Provider>,
  ROOT
);
