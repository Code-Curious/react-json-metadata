import immutable from 'object-path-immutable';
import _ from 'lodash';

import { EDIT_VALUE, EDIT_NAME, EDIT_TYPE } from '../actions/actionTypes';


/*
  rawPath : 'a.b.c.d[2]'
  returned value : 'a.properties.b.properties.c.properties.d.items[2]'
*/
const extractJsonPath = (state, rawPath) => {
  console.log("rawPath :", rawPath);
  const nodeArray = rawPath.split('.')
  const result = "jsonData." + nodeArray.map( (word, index) => {
    if (index === nodeArray.length - 1) return word;
    else return word + ".properties.";
  }).join('')

  console.info("result path :", result);
  return result;
}

const extractJsonParentPath = (state, rawPath) => {
  console.log("rawPath :", rawPath);
  const nodeArray = rawPath.split('.')
  if (nodeArray.length === 1) return "jsonData"
  const result = "jsonData." + nodeArray.map( (word, index) => {
    if (index === nodeArray.length - 1) return word;
    else return word + ".properties.";
  }).slice(-1) // enlever le dernier élement (retourner *.properties)
    .join('') // comporte un "." de plus
    .slice(0, -1) // retourner *.properties

  console.info("result path :", result);
  return result;
}

/*
  path : 'a.b.c.d'
  returns : a.b.c.d
*/
const getNestedPropertyByPath = (obj, path, separator) => {
  try {
    separator = separator || '.';

    return path
      // .replace('[', separator)
      // .replace(']', '')
      .split(separator)
      .reduce(function(obj, property) {
          return obj[property];
        }, obj
      );
  } catch (err) {
    return undefined;
  }
}


// TODO: action pour update key
// TODO: action pour update type
// TODO: action pour save jsonData to localStorage
// DONE: actions pour modals
export default function rootReducer(state = [], action = {}) {
  // console.log("Action was fired");
  switch(action.type) {
    case EDIT_VALUE:
      return immutable.set(state, extractJsonPath(state, action.path) + '.value', action.newValue);

    case EDIT_NAME:
      let result = _.cloneDeep(state)
      let rawParentPath = action.path.split('.').slice(-1).join(''); // enlever le dernier élément du path
      let parentPath = extractJsonParentPath(result, rawParentPath);
      let parentNode = getNestedPropertyByPath(result, parentPath, '.');
      parentNode[action.newName] = parentNode[action.itemKey];
      return result;

    case EDIT_TYPE:
      return state;
    default: 
      console.log("Unknown action fired :", action.type);
      return state;

  }
}
