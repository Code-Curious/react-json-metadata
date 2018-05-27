import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import rootReducer from './reducers/rootReducer';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
