import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { dialogReducer } from 'redux-dialog';

import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import rootReducer from './reducers/rootReducer';


const reducers = {
  jsonData: rootReducer,
  dialogReducer
}

const defaultState = {
  jsonData: {
    "name": {
      "type": "string",
      "value": "Test"
    },
    "age": {
      "type": "number",
      "value": 24
    },
    "favorite_color": {
      "type": "string",
      "value": "silver"
    },
    "gender": {
      "type": "string",
      "enum": [
      "male",
      "female"
      ],
      "value": "male"
    },
    "location": {
      "type": "object",
      "title": "Location",
      "properties": {
        "country": {
          "type": "string",
          "value": "Morocco"
        },
        "city": {
          "type": "string",
          "value": "Rabat"
        },
        "house": {
          "type": "object",
          "properties": {
            "typee": {
              "type": "string",
              "value": "apartment"
            },
            "floor": {
              "type": "object", 
              "properties":{
                "number": {
                  "type": "number",
                  "value": 3
                },
                "hasElevator" : {
                  "type": "boolean",
                  "value": true
                }
              }}
            }
          }
        }
      },
      "pet": {
        "type": "object",
        "properties":{
          "typee":{
            "type": "string",
            "value": "cat"
          },
          "name": {
            "type": "string", 
            "value":"Simba"
          }
        }
      }
    }
}

const combinedReducer = combineReducers(reducers);
console.log("combinedReducer :", combinedReducer);
  
const store = createStore(
  combinedReducer,
  defaultState,
  composeWithDevTools(applyMiddleware(thunk))
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
