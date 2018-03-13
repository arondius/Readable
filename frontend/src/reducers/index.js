import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import { 
  REQUEST_POSTS,
  RECEIVE_POSTS,
  // REQUEST_POST,
  REQUEST_SAVE_POST,
  DELETE_POST,
  REQUEST_UPDATE_POST,
  RECEIVE_UPDATE_POST,
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  TOGGLE_POST_FORM,
  CLOSE_POST_FORM,
  REQUEST_UP_VOTE,
  REQUEST_DOWN_VOTE,
  RECEIVE_VOTE,
  GET_POSTS_IN_CATEGORY,
  SORT_POSTS
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

function sortByKey(array, key, direction = "up") {
    const newArray = array.slice();
    return newArray.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        if(direction === "down") {
          console.log('down', ((x < y) ? -1 : ((x > y) ? 1 : 0)));
          return x - y;
        } else if (direction === "up") {
          console.log('up', ((x < y) ? -1 : ((x > y) ? 0 : 1)));
          return y - x;
        }
    });
}

const defaultPostsState = {
  isFetching: false,
  items: []
}

function posts(state = defaultPostsState, action) {
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
    case REQUEST_UPDATE_POST:
      return state;
      case SORT_POSTS:
        switch(action.method) {
          case "dateUp":
            return {
              ...state,
              items: sortByKey(action.items, "timestamp", "up")
            };
          break;
          case "dateDown":
            return {
              ...state,
              items: sortByKey(action.items, "timestamp", "down")
            };
          break;
          case "populairUp":
            return {
              ...state,
              items: sortByKey(action.items, "voteScore")
            };
          break;
          case "popularDown":
            return {
              ...state,
              items: sortByKey(action.items, "voteScore", "down")
            };
          break;
        }
    case REQUEST_UP_VOTE:
    case REQUEST_DOWN_VOTE:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_VOTE:
      return {
        ...state,
        isFetching: false,
        items: [
          ...state.items.map( (item, index) => {
            if(item["id"] !== action.id) {
              return item
            }
            
            console.log('action.voteScore', action.voteScore);
            item["voteScore"] = action.voteScore
            console.log('item["voteScore"]', item["voteScore"]);
            return {
              ...item
            }
          })
        ]
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