import {
  TOGGLE_POST_FORM,
  CLOSE_POST_FORM,
} from '../actions/actionTypes'

const defaultpostEditState = {
    id: null,
    mode: null,
    open: false
}

export default function postEditForm(state = defaultpostEditState, action) {
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
      return state
  }
}