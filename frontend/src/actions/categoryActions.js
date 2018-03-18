import { url, myHeaders } from './constants'

import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
} from './actionTypes'


// Categories action creators
export const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
})

export const receiveCategories = (json) => ({
  type: RECEIVE_CATEGORIES,
  categories: json,
  receivedAt: Date.now
})

export function fetchCategories() {
  return function(dispatch) {
    dispatch(requestCategories())

    const myInit = {
      method: 'GET',
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}categories`
    const myRequest = new Request(requetsUrl, myInit)
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then(json => {
      // console.log(json)
      dispatch(receiveCategories(json))}
    )
  }
}