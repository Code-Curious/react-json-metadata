import { openDialog, closeDialog } from 'redux-dialog';
import { EDIT_VALUE, EDIT_NAME, EDIT_TYPE} from './actionTypes';


// Action creators, retournes les actions

// TODO: value paths should be sanitized
export const editValue = (newValue, path) => ({
    type: EDIT_VALUE,
    newValue,
    path
})

export const openEditModal = (type, itemKey, path, depth) => openDialog('EDIT_PROPERTY', { type, itemKey, path, depth })

export const closeEditModal = () => closeDialog('EDIT_PROPERTY');

export const editType = (newType, path, itemKey, depth) => ({
    type: EDIT_TYPE,
    newType,
    path,
    itemKey,
    depth
})

export const editName = (newName, path, itemKey, depth) => ({
    type: EDIT_NAME,
    newName,
    path,
    itemKey,
    depth
})

