import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/index'
import { fetchPosts, fetchCategories } from './actions/postActions'
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger()
const middleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
);


const store = createStore(
  reducer,
  compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

store.dispatch(fetchPosts());
store.dispatch(fetchCategories());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();