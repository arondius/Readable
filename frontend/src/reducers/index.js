import { combineReducers } from 'redux';
import { 
  REQUEST_POSTS,
  RECEIVE_POSTS,
  // REQUEST_POST,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FETCH_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  TOGGLE_POST_FORM,
  CLOSE_POST_FORM
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
    case ADD_POST:
      return {
        ...state,
          [action.id]: {
            title: action.title,
            body: action.body
          }
      }
    case DELETE_POST:
      return removeByKey(state, action.id);
    case UPDATE_POST:
      return state;
    default:
      return state;
  }
}

const defaultCommentState = [
    {
        "id": "894tuq4ut84ut8v4t8wun89g",
        "parentId": "8xf0y6ziyjabvozdd253nd",
        "timestamp": 1468166872634,
        "body": "Hi there! I am a COMMENT.",
        "author": "thingtwo",
        "voteScore": 6,
        "deleted": false,
        "parentDeleted": false
    },
    {
        "id": "8tu4bsun805n8un48ve89",
        "parentId": "8xf0y6ziyjabvozdd253nd",
        "timestamp": 1469479767190,
        "body": "Comments. Are. Cool.",
        "author": "thingone",
        "voteScore": -5,
        "deleted": false,
        "parentDeleted": false
    }
]

function comments(state = defaultCommentState, action) {
  switch(action.type) {
    case FETCH_COMMENTS:
      return state;
    case ADD_COMMENT:
      return state;
    case DELETE_COMMENT:
      return state;
    case UPDATE_COMMENT:
      return state;
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
    posts, comments, postEditForm
});