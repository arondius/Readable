import {
  REQUEST_UP_VOTE,
  REQUEST_DOWN_VOTE,
  RECEIVE_VOTE,
} from '../action/actionTypes'

const defaultVotesState = {
  isFetching: false,
  items: []
}

export default function votes(state = defaultVotesState, action) {
  switch(action.type) {
    case REQUEST_UP_VOTE:
    case REQUEST_DOWN_VOTE:
      return {
        ...state,
          isFetching: true
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

