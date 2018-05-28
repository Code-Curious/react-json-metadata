import { EDIT_VALUE } from './actionTypes.js';


// Action creators, retournes les actions

export const editValue = (newValue, path) => ({
    type: EDIT_VALUE,
    newValue,
    path
})
