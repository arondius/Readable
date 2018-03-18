import { sortByKey, updateObjectInArray } from './helpers'

import {
  RECEIVE_POSTS,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_SAVE_POST,
  REQUEST_DELETE_POST,
  RECEIVE_DELETE_POST,
  REQUEST_UPDATE_POST,
  RECEIVE_UPDATE_POST,
  TOGGLE_POST_FORM,
  CLOSE_POST_FORM,
  SORT_POSTS,
  RECEIVE_VOTE,
} from '../actions/actionTypes'

const defaultPostsState = {
  isFetching: false,
  items: []
}

export default function posts(state = defaultPostsState, action) {
  switch(action.type) {
    case REQUEST_UPDATE_POST:
    case REQUEST_SAVE_POST:
    case REQUEST_DELETE_POST:
      return {
        ...state,
          isFetching: true
      }
    case RECEIVE_POSTS:
      return {
        ...state,
          isFetching: false,
          items: action.posts
      }
    case RECEIVE_UPDATE_POST:
      return {
        ...state,
        items: updateObjectInArray(state.items, action),
        isFetching: false
      }
    case RECEIVE_DELETE_POST:
      return {
        ...state,
        isFetching: false,
        items: [
          ...state.items.filter( (item) => item.id !== action.id )
        ]
      }
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
    case SORT_POSTS:
      switch(action.method) {
        case "dateUp":
          return {
            ...state,
            items: sortByKey(action.items, "timestamp", "up")
          }
        case "dateDown":
          return {
            ...state,
            items: sortByKey(action.items, "timestamp", "down")
          }
        case "populairUp":
          return {
            ...state,
            items: sortByKey(action.items, "voteScore")
          }
        case "popularDown":
          return {
            ...state,
            items: sortByKey(action.items, "voteScore", "down")
          }
        default: 
          return state
      }
    case RECEIVE_VOTE:
      if (action.voteType !== 'posts') {
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
    default:
      return state
  }
}