import immutable from 'object-path-immutable';
import _ from 'lodash';

import { EDIT_VALUE, EDIT_NAME, EDIT_TYPE } from '../actions/actionTypes';


/*
  rawPath : 'a.b.c.d[2]'
  returned value : 'a.properties.b.properties.c.properties.d.items[2]'
*/
const extractJsonPath = (state, rawPath) => {
  console.log("rawPath :", rawPath); // "jsonData.a.b.c"
  const nodeArray = rawPath.split('.')
  nodeArray.shift(); // remove "jsonPath"
  // const result = "jsonData." + nodeArray.map( (word, index) => {
  const result = nodeArray.map( (word, index) => {
    if (index === nodeArray.length - 1) return word;
    else return word + ".properties.";
  }).join('')

  console.info("result path :", result);
  return result;
}

const extractJsonParentPath = (state, rawPath) => {
  console.log("rawPath :", rawPath);
  const nodeArray = rawPath.split('.')
  // if (nodeArray.length === 1) return "jsonData"
  if (nodeArray.length === 1) return "" // si depth == 0, exemple : jsonData.name
  // const result = "jsonData." + nodeArray.map( (word, index) => {
  const result = nodeArray.map( (word, index) => {
    if (index === nodeArray.length - 1) {
      return word;
    } else {
    return word + ".properties.";
    }
  }).slice(-1) // enlever le dernier élement (retourner *.properties)
    .join('') // comporte un "." de plus
    // .slice(0, -1) // retourner *.properties

  console.info("result path :", result);
  return result;
}

/*
  path : 'a.b.c.d'
  returns : a.b.c.d
*/
const getNestedPropertyByPath = (obj, path, separator) => {
  let result;
  if (path === "") return obj // if root node
  try {
    separator = separator || '.';
    result = path
      // .replace('[', separator)
      // .replace(']', '')
      .split(separator)
      .reduce(function(acc, property) {
          return acc[property];
        }, obj
      );
  } catch (err) {
    result = undefined;
  }
  return result
}

const getParentNode = (state, actionPath) => {
  let rawParentPathPartsArray = actionPath.split('.')
  rawParentPathPartsArray.pop(); // enlever le dernier élément du path
  let rawParentPath = rawParentPathPartsArray.join('.');
  let parentPath = extractJsonParentPath(state, rawParentPath);
  console.log("parentPath :", parentPath);
  return getNestedPropertyByPath(state, parentPath, '.');
  
}

// TODO: action pour update key
// TODO: action pour update type
// TODO: action pour save jsonData to localStorage
// DONE: actions pour modals
export default function rootReducer(state = [], action = {}) {
  let result = {};
  let parentNode = {}; // a.properties.b
  let containerNode = {}; // a.properties.b.properties 

  switch(action.type) {
    case EDIT_VALUE:
      return immutable.set(state, extractJsonPath(state, action.path) + '.value', action.newValue);

    case EDIT_NAME:
      result = _.cloneDeep(state);
      console.log("action.depth :", action.depth);
      if (action.depth === 0) {
        containerNode = result;
      } else {
        parentNode = getParentNode(result, action.path);
        console.log("parentNode before :", parentNode);
        containerNode = parentNode.properties;
      }

      // rename property
      containerNode[action.newName] = containerNode[action.itemKey];
      delete containerNode[action.itemKey]; 
      console.log("parentNode after :", parentNode);
      console.log("reducer result :", result);
      return result;

    case EDIT_TYPE:
      result = _.cloneDeep(state);
      console.log("action.depth :", action.depth);
      if (action.depth === 0) {
        containerNode = result;
      } else {
        parentNode = getParentNode(result, action.path);
        console.log("parentNode before :", parentNode);
        containerNode = parentNode.properties;
      }

      // edit property type
      containerNode[action.itemKey].type = action.newType;
      console.log("parentNode after :", parentNode);
      console.log("reducer result :", result);
      return result;

    default: 
      console.log("Unknown action fired :", action.type);
      return state;

  }
}
