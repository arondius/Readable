import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import { 
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_SAVE_POST,
  DELETE_POSTRECEIVE_,
  REQUEST_DELETE_POST,
  RECEIVE_DELETE_POST,
  REQUEST_UPDATE_POST,
  RECEIVE_UPDATE_POST,
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  RECEIVE_DELETE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  REQUEST_UPDATE_COMMENT,
  RECEIVE_UPDATE_COMMENT,
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
    case REQUEST_UPDATE_POST:
    case REQUEST_SAVE_POST:
    case REQUEST_UP_VOTE:
    case REQUEST_DOWN_VOTE:
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
    case RECEIVE_UPDATE_POST:
      return {
        ...state,
        items: updateObjectInArray(state.items, action),
        isFetching: false
      }
    case RECEIVE_DELETE_POST:
      return {
        ...state,
        items: [
          ...state.items.filter( (item) => item.id !== action.id )
        ]
      }
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
    case RECEIVE_VOTE:
      if (action.voteType !== 'posts') {
        console.log(action);
        return state;
      }
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
    case REQUEST_COMMENTS:
    case REQUEST_UPDATE_COMMENT:
    case REQUEST_UP_VOTE:
    case REQUEST_DOWN_VOTE:
    return {
      ...state,
      isFetching: true
    };
    case RECEIVE_DELETE_COMMENT:
      return {
        ...state,
        items: [
          ...state.items.filter( (item) => item.id !== action.id )
        ]
      }
    case RECEIVE_VOTE:
      if (action.voteType !== 'comments') {
        return state;
      }
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
      return {
        ...state,
        isFetching: false,
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
        open: (!state.open || (state.id !== action.id && state.open)) ? true: false,
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