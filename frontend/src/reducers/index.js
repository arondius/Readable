import { combineReducers } from 'redux';
import { 
  FETCH_POSTS,
  FETCH_POST,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FETCH_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT, 
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

const defaultPostState = [
    {
        "id": "8xf0y6ziyjabvozdd253nd",
        "timestamp": 1467166872634,
        "title": "Udacity is the best place to learn React",
        "body": "Everyone says so after all.",
        "author": "thingtwo",
        "category": "react",
        "voteScore": 6,
        "deleted": false,
        "commentCount": 2
    },
    {
        "id": "6ni6ok3ym7mf1p33lnez",
        "timestamp": 1468479767190,
        "title": "Learn Redux in 10 minutes!",
        "body": "Just kidding. It takes more than 10 minutes to learn technology.",
        "author": "thingone",
        "category": "redux",
        "voteScore": -5,
        "deleted": false,
        "commentCount": 0
    },
    {
        "id": "8xf0y6ziyjabvozdd2asdf3nd",
        "timestamp": 1467166872700,
        "title": "Post toegevoegd door arend",
        "body": "Everyone says so after all.",
        "author": "arend",
        "category": "react",
        "voteScore": 1,
        "deleted": false,
        "commentCount": 0
    }
]

function posts(state = defaultPostState, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return state;
    case FETCH_POST:
      return state;
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

export default combineReducers({
    posts, comments
});