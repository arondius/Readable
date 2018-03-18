import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_SAVE_POST,
  REQUEST_DELETE_POST,
  RECEIVE_DELETE_POST,
  REQUEST_UPDATE_POST,
  RECEIVE_UPDATE_POST,
  TOGGLE_POST_FORM,
  CLOSE_POST_FORM,
  SORT_POSTS,
} from './actionTypes'

import { url, myHeaders } from './constants'

// Post action creators
export const requestPosts = () => ({
  type: REQUEST_POSTS,
})

export const receivePosts = (json) => ({
  type: RECEIVE_POSTS,
  posts: json,
  receivedAt: Date.now
})

export function fetchPosts() {
  return function(dispatch) {
    dispatch(requestPosts())

    const myInit = {
      method: 'GET',
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}posts`
    const myRequest = new Request(requetsUrl, myInit)
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then(json => dispatch(receivePosts(json)))
  }
}

export const requestSavePost = () => ({
  type: REQUEST_SAVE_POST,
})

export function savePost(postValues) {
  return function(dispatch) {
    dispatch(requestSavePost())
        
    const myInit = {
      method: 'POST',
      body: JSON.stringify(postValues),
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}posts`
    const myRequest = new Request(requetsUrl, myInit)
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then(() => dispatch(fetchPosts(null)))
  }
}

export const requestDeletePost = () => ({
  type: REQUEST_DELETE_POST,
})

export const receiveDeletePost = (id) => ({
  type: RECEIVE_DELETE_POST,
  id
})

export function deletePost(id) {
  return function(dispatch) {
    dispatch(requestDeletePost())
    const data = {id}
        
    const myInit = {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}posts/${id}`
    const myRequest = new Request(requetsUrl, myInit)
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then((json) => dispatch(receiveDeletePost(id)))
  }
}

export const requestUpdatePost = (id) => ({
  type: REQUEST_UPDATE_POST,
  id
})


export const receiveUpdatePost = (id, json) => ({
  type: RECEIVE_UPDATE_POST,
  id,
  json
})

export function updatePost(id, title, body) {
  return function(dispatch) {
    dispatch(requestUpdatePost(id))
    
    const data = {id, title, body}
    
    const myInit = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}posts/${id}`
    const myRequest = new Request(requetsUrl, myInit)
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then((json) => {
      dispatch(receiveUpdatePost(id, json))
      dispatch(closePostForm(id))
    })
  }
}

export const togglePostForm = (id) => ({
  type: TOGGLE_POST_FORM,
  id,
})

export const closePostForm = (id) => ({
  type: CLOSE_POST_FORM,
  id
})

export const sortPosts = (method, items) => ({
  type: SORT_POSTS,
  method,
  items
})