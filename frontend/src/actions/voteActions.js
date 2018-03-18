import { url, myHeaders } from './constants'

import {
  REQUEST_UP_VOTE,
  REQUEST_DOWN_VOTE,
  RECEIVE_VOTE,
} from './actionTypes'

// Votes action creators
export const requestUpVote = (id) => ({
  type: REQUEST_UP_VOTE,
  id
})

export const requestDownVote = (id) => ({
  type: REQUEST_DOWN_VOTE,
  id
})

export const receiveVote = (id, voteScore, voteType) => ({
  type: RECEIVE_VOTE,
  id,
  voteScore,
  voteType
})

export function vote(id, option, type) {
  return function(dispatch) {
    const data = {option}
    const myInit = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}${type}/${id}`
    const myRequest = new Request(requetsUrl, myInit)
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then(
      (json) => {
        return dispatch(receiveVote(id, json.voteScore, type))
      }
    )
  }
}