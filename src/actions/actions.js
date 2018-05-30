import { EDIT_VALUE } from './actionTypes.js';


// Action creators, retournes les actions

// TODO: value paths should be sanitized
export const editValue = (newValue, path) => ({
    type: EDIT_VALUE,
    newValue,
    path
})
