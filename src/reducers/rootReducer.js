import immutable from 'object-path-immutable';

import { EDIT_VALUE } from '../actions/actionTypes';


/*
  rawPath : 'a.b.c.d[2]'
  returned value : 'a.properties.b.properties.c.properties.d.items[2].value'
*/
const extractJsonPath = function(state, rawPath) {
  console.log("rawPath :", rawPath);
  const nodeArray = rawPath.split('.')
  const result = "jsonData." + nodeArray.map( (word, index) => {
    if (index === nodeArray.length - 1) return word + ".value";
    else return word + ".properties.";
  }).join('')

  console.info("result :", result);
  return result;
}

const defaultState = {
  jsonData: {
    "name": {
      "type": "string",
      "value": "Salim"
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
            "size": {
              "type": "string", 
              "value":"medium"
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


// TODO: action pour save jsonData to localstorage
// TODO: action pour update key
// TODO: action pour update type
export default function rootReducer(state = defaultState, action = {}) {
  // console.log("Action was fired");
  switch(action.type) {
    case EDIT_VALUE:
      return immutable.set(state, extractJsonPath(state, action.path), action.newValue);
    default: 
      console.log("Unknown action fired");
      return state;

  }
}
