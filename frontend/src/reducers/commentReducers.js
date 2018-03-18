import { updateObjectInArray } from './helpers'

import {
  RECEIVE_DELETE_POST,
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  REQUEST_SAVE_COMMENT,
  REQUEST_DELETE_COMMENT,
  RECEIVE_DELETE_COMMENT,
  REQUEST_UPDATE_COMMENT,
  RECEIVE_UPDATE_COMMENT,
  REQUEST_UP_VOTE,
  REQUEST_DOWN_VOTE,
  RECEIVE_VOTE,
} from '../actions/actionTypes'

const defaultCommentsState = {
  isFetching: false,
  items: []
}

export default function comments(state = defaultCommentsState, action) {
  switch(action.type) {
    case REQUEST_COMMENTS:
    case REQUEST_UPDATE_COMMENT:
    case REQUEST_UP_VOTE:
    case REQUEST_DOWN_VOTE:
    case REQUEST_SAVE_COMMENT:
    case REQUEST_DELETE_COMMENT:
    return {
      ...state,
      isFetching: true
    }
    case RECEIVE_COMMENTS:
    return {
      ...state,
      isFetching: false,
      items: action.comments
    }
    case RECEIVE_DELETE_COMMENT:
      return {
        ...state,
        isFetching: false,
        items: [
          ...state.items.filter( (item) => item.id !== action.id )
        ]
      }
    case RECEIVE_VOTE:
      if (action.voteType !== 'comments') {
        return state
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
              return item
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
      return state
  }
}