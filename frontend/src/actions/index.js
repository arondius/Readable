const url = 'http://localhost:3001/'

// Post action creators
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const requestPosts = (category) => ({
  type: REQUEST_POSTS,
  category
})

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const receivePosts = (category, json) => ({
  type: RECEIVE_POSTS,
  category,
  posts: json,
  receivedAt: Date.now
})

export function fetchPosts(category = null) {
  return function(dispatch) {
    dispatch(requestPosts(category))
    
    const myHeaders = new Headers({
      'Authorization': '1234'
    });
    const myInit = {
      method: 'GET',
      headers: myHeaders,
    }
    
    const requetsUrl = category ? `${url}category/${category}/posts` : `${url}posts`
    const myRequest = new Request(requetsUrl, myInit);
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then(json => dispatch(receivePosts(category, json)))
  }
}

export const REQUEST_SAVE_POST = 'REQUEST_SAVE_POST';
export const requestSavePost = (id, title, body, author, category, timestamp) => ({
  type: REQUEST_SAVE_POST,
  id,
  title,
  body,
  author,
  category,
  timestamp,
})

export function savePost(id, title, body, author, category, timestamp) {
  return function(dispatch) {
    dispatch(requestSavePost(id, title, body, author, category, timestamp))
    
    const data = {id, title, body, author, category, timestamp}
    
    const myHeaders = new Headers({
      'Authorization': '1234',
      'Content-Type': 'application/json'
    });
    
    const myInit = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}posts`
    const myRequest = new Request(requetsUrl, myInit);
    return fetch(myRequest)
    .then(
      response => console.log(response.json()), error => console.log('An error occured: ', error)
    )
    .then(() => dispatch(fetchPosts(null)))
  }
}

export const REQUEST_POST = 'REQUEST_POST';
export const requestPost = (id) => ({
  type: REQUEST_POST,
  id
})

export const ADD_POST = 'ADD_POST';
export const addPost = (id, title, body) => ({
  type: ADD_POST,
  id,
  title,
  body
})

export const DELETE_POST = 'DELETE_POST';
export const deletePost = (id) => ({
  type: DELETE_POST,
  id
})

export const UPDATE_POST = 'UPDATE_POST';
export const updatePost = (id) => ({
  type: UPDATE_POST,
  id
})

// Comments action creators
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const requestComments = (id) => ({
  type: REQUEST_COMMENTS,
  id
})

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const receiveComments = (id, json) => ({
  type: RECEIVE_COMMENTS,
  id,
  comments: json,
  receivedAt: Date.now
})

export function fetchComments(postId = null) {
  return function(dispatch) {
    dispatch(requestComments(postId))
    
    const myHeaders = new Headers({
      'Authorization': '1234'
    });
    const myInit = {
      method: 'GET',
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}posts/${postId}/comments`
    const myRequest = new Request(requetsUrl, myInit);
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then(json => dispatch(receiveComments(postId, json)))
  }
}

export const ADD_COMMENT = 'ADD_COMMENT';
export const addComment = (id) => ({
  type: ADD_COMMENT,
  id
})

export const DELETE_COMMENT = 'DELETE_COMMENT';
export const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  id
})

export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const updateComment = (id) => ({
  type: UPDATE_COMMENT,
  id
})

// Votes action creators
export const REQUEST_UP_VOTE = 'REQUEST_UP_VOTE';
export const requestUpVote = (id) => ({
  type: REQUEST_UP_VOTE,
  id
})

export const REQUEST_DOWN_VOTE = 'REQUEST_DOWN_VOTE';
export const requestDownVote = (id) => ({
  type: REQUEST_DOWN_VOTE,
  id
})

export function vote(id, option) {
  return function(dispatch) {
    const voteOption = option === 'upvote' ? requestUpVote(id) : requestDownVote(id);
    dispatch(voteOption);
    
    const myHeaders = new Headers({
      'Authorization': '1234',
      'Content-Type': 'application/json'
    });
    
    const data = {option}
    const myInit = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}posts/${id}`
    const myRequest = new Request(requetsUrl, myInit);
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then(() => dispatch(fetchPosts(null)))
  }
}

// Category ADD_COMMENTion creators
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  category
})

export const TOGGLE_POST_FORM = 'TOGGLE_POST_FORM'
export const togglePostForm = (id, mode) => ({
  type: TOGGLE_POST_FORM,
  id,
  mode
})

export const CLOSE_POST_FORM = 'CLOSE_POST_FORM'
export const closePostForm = (id) => ({
  type: CLOSE_POST_FORM,
  id
})