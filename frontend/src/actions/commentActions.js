import { url, myHeaders } from './constants'
import { fetchPosts, closePostForm } from './postActions'

import {
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  REQUEST_SAVE_COMMENT,
  UPDATE_COMMENT_COUNT,
  REQUEST_DELETE_COMMENT,
  RECEIVE_DELETE_COMMENT,
  REQUEST_UPDATE_COMMENT,
  RECEIVE_UPDATE_COMMENT,
} from './actionTypes'

// Comments action creator
export const requestComments = (id) => ({
  type: REQUEST_COMMENTS,
  id
})

export const receiveComments = (id, json) => ({
  type: RECEIVE_COMMENTS,
  id,
  comments: json,
  receivedAt: Date.now
})

export function fetchComments(postId = null) {
  return function(dispatch) {
    dispatch(requestComments(postId))

    const myInit = {
      method: 'GET',
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}posts/${postId}/comments`
    const myRequest = new Request(requetsUrl, myInit)
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then(json => dispatch(receiveComments(postId, json)))
  }
}

export const requestSaveComment = () => ({
  type: REQUEST_SAVE_COMMENT,
})

export const updateCommentCount = (parentId) => ({
  type: UPDATE_COMMENT_COUNT,
})

export function saveComment(postValues) {
  return function(dispatch) {
    dispatch(requestSaveComment())
        
    const myInit = {
      method: 'POST',
      body: JSON.stringify(postValues),
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}comments`
    const myRequest = new Request(requetsUrl, myInit)
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then(() => {
      dispatch(fetchComments(postValues.parentId))
      dispatch(fetchPosts())
    })
  }
}

export const requestDeleteComment = (id) => ({
  type: REQUEST_DELETE_COMMENT,
  id
})

export const receiveDeleteComment = (id) => ({
  type: RECEIVE_DELETE_COMMENT,
  id
})

export function deleteComment(id = null) {
  return function(dispatch) {
    dispatch(requestDeleteComment(id))
    const data = {id}
        
    const myInit = {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}comments/${id}`
    const myRequest = new Request(requetsUrl, myInit)
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then((json) => {
      dispatch(receiveDeleteComment(id))
      dispatch(fetchPosts())
    })
  }
}

export const requestUpdateComment = (id) => ({
  type: REQUEST_UPDATE_COMMENT,
  id
})

export const receiveUpdateComment = (id, json) => ({
  type: RECEIVE_UPDATE_COMMENT,
  id,
  json
})

export function updateComment(id, body) {
  return function(dispatch) {
    dispatch(requestUpdateComment(id))
    
    const data = {id, body}
    
    const myInit = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}comments/${id}`
    const myRequest = new Request(requetsUrl, myInit)
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then((json) => {
      dispatch(receiveUpdateComment(id, json))
      dispatch(closePostForm(id))
    })
  }
}