import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import { 
  REQUEST_POSTS,
  RECEIVE_POSTS,
  // REQUEST_POST,
  REQUEST_SAVE_POST,
  DELETE_POST,
  UPDATE_POST,
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  TOGGLE_POST_FORM,
  CLOSE_POST_FORM,
  REQUEST_UP_VOTE,
  REQUEST_DOWN_VOTE
} from '../actions'

function removeByKey(myObject, deleteKey) {
  console.log('object',myObject);
  return Object.keys(myObject)
    .filter(key => key !== deleteKey)
    .reduce((result, current) => {
      result[current] = myObject[current];
      return result;
    }, {});
}

const defaultPostState = {
  isFetching: false,
  items: []
}

function posts(state = defaultPostState, action) {
  switch(action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
          isFetching: true
      };
    case RECEIVE_POSTS:
      return {
        ...state,
          isFetching: false,
          items: action.posts
      };
    case REQUEST_SAVE_POST:
      return {
        ...state,
          isFetching: true
        };
    case DELETE_POST:
      return removeByKey(state, action.id);
    case UPDATE_POST:
      return state;
    case REQUEST_UP_VOTE:
    case REQUEST_DOWN_VOTE:
      return {
        ...state,
        isFetching: true
      }
    default:
      return state;
  }
}

const defaultCommentsState = {
  isFetching: false,
  items: []
}

function comments(state = defaultCommentsState, action) {
  switch(action.type) {
    
    case ADD_COMMENT:
      return state;
    case DELETE_COMMENT:
      return state;
    case UPDATE_COMMENT:
      return state;
    case REQUEST_COMMENTS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_COMMENTS:
      return {
        ...state,
        isFetching: false,
        items: action.comments
      };
    // case UPP_VOTE:
    //   return state;
    // case DOWN_VOTE:
    //   return state;
    default:
      return state;
  }
}

const defaultpostEditState = {
    id: null,
    mode: null,
    open: false
}

function postEditForm(state = defaultpostEditState, action) {
  switch(action.type) {
    case TOGGLE_POST_FORM:
      return {
        ...state,
        id: action.id,
        open: (!state.open || (state.mode !== action.mode) || (state.id !== action.id && state.open)) ? true: false,
        mode: action.mode
      }
    case CLOSE_POST_FORM:
        return {
          ...state,
            open: false
        }
    default:
      return state;
  }
}

export default combineReducers({
    posts, comments, postEditForm, form: formReducer
});