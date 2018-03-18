import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
} from '../actions/actionTypes'


const defaultCategoriesState = {
  isFetching: false,
  items: []
}

export default function categories(state = defaultCategoriesState, action) {
  switch(action.type) {
    case REQUEST_CATEGORIES:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        items: [
          ...action.categories.categories
        ]
      }
    default:
      return state
  }
}