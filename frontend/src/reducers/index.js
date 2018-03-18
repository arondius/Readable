import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import posts from './postReducers'
import comments from './commentReducers'
import categories from './categoriesReducers'
import postEditForm from './postEditFormReducers'

export default combineReducers({
    posts, comments, postEditForm, categories, form: formReducer
})