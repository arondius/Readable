import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_SAVE_POST,
  REQUEST_POST,
  REQUEST_DELETE_POST,
  RECEIVE_DELETE_POST,
  DELETE_POST,
  REQUEST_UPDATE_POST,
  RECEIVE_UPDATE_POST,
  TOGGLE_POST_FORM,
  CLOSE_POST_FORM,
  SORT_POSTS,
  
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  REQUEST_SAVE_COMMENT,
  UPDATE_COMMENT_COUNT,
  REQUEST_DELETE_COMMENT,
  RECEIVE_DELETE_COMMENT,
  REQUEST_UPDATE_COMMENT,
  RECEIVE_UPDATE_COMMENT,
  
  REQUEST_UP_VOTE,
  REQUEST_DOWN_VOTE,
  RECEIVE_VOTE,
} from '../actions/actionTypes'

function sortByKey(array, key, direction = "up") {
    const newArray = array.slice();
    return newArray.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        if(direction === "down") {
          return x - y;
        } else if (direction === "up") {
          return y - x;
        }
        return null;
    });
}

function updateObjectInArray(array, action) {
    return array.map( (item, index) => {
        if(item.id !== action.id) {
            // This isn't the item we care about - keep it as-is
            return item;
        }
        
        // Otherwise, this is the one we want - return an updated value
        return {
            ...item,
            ...action.json
        };    
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
    case REQUEST_DELETE_POST:
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
        case "dateDown":
          return {
            ...state,
            items: sortByKey(action.items, "timestamp", "down")
          };
        case "populairUp":
          return {
            ...state,
            items: sortByKey(action.items, "voteScore")
          };
        case "popularDown":
          return {
            ...state,
            items: sortByKey(action.items, "voteScore", "down")
          };
        default: 
          return state
      }
    case RECEIVE_VOTE:
      if (action.voteType !== 'posts') {
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
            item["voteScore"] = action.voteScore
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

const defaultCategoriesState = {
  isFetching: false,
  items: []
}

function categories(state = defaultCategoriesState, action) {
  switch(action.type) {
    case REQUEST_CATEGORIES:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        bla: console.log(action),
        items: [
          ...action.categories.categories
        ]
      };
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
    case RECEIVE_COMMENTS:
    return {
      ...state,
      isFetching: false,
      items: action.comments
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
            
            item["voteScore"] = action.voteScore
            return {
              ...item
            }
          })
        ]
      }
    // Setting parentDeleted flag to true when post is deleted 
    case RECEIVE_DELETE_POST:
      return {
        ...state,
        isFetching: false,
        items: [
          ...state.items.filter( (item) => {
            if(item.parentId !== action.id) {
              return item;
            }
            return null
          }
          )
        ]
      }
    case RECEIVE_UPDATE_COMMENT:
      return {
        ...state,
        items: updateObjectInArray(state.items, action),
        isFetching: false
      }
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
    posts, comments, postEditForm, categories, form: formReducer
});