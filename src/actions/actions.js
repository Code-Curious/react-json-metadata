import { EDIT_VALUE, EDIT_NAME, EDIT_TYPE } from './actionTypes';


// Action creators, retournes les actions

// TODO: value paths should be sanitized
export const editValue = (newValue, path) => ({
    type: EDIT_VALUE,
    newValue,
    path
})

export const editType = (newType, path) => ({
    type: EDIT_TYPE,
    newType,
    path
})

export const editName = (newName, path, itemKey) => ({
    type: EDIT_NAME,
    newName,
    path,
    itemKey
})
