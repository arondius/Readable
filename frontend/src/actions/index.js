const url = 'http://localhost:3001/'

const myHeaders = new Headers({
  'Authorization': '1234',
  'Content-Type': 'application/json'
});

// Post action creators
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const requestPosts = () => ({
  type: REQUEST_POSTS,
})

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const receivePosts = (json) => ({
  type: RECEIVE_POSTS,
  posts: json,
  receivedAt: Date.now
})

export function fetchPosts() {
  return function(dispatch) {
    dispatch(requestPosts())
    
    const myHeaders = new Headers({
      'Authorization': '1234'
    });
    const myInit = {
      method: 'GET',
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}posts`
    const myRequest = new Request(requetsUrl, myInit);
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then(json => dispatch(receivePosts(json)))
  }
}

// Category  creators
export const GET_POSTS_IN_CATEGORY = 'GET_POSTS_IN_CATEGORY'
export const getPostsInCategory = (category) => ({
  type: GET_POSTS_IN_CATEGORY,
  category
})

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

export const REQUEST_UPDATE_POST = 'REQUEST_UPDATE_POST';
export const requestUpdatePost = (id) => ({
  type: REQUEST_UPDATE_POST,
  id
})


export const RECEIVE_UPDATE_POST = 'RECEIVE_UPDATE_POST';
export const receiveUpdatePost = (id, json) => ({
  type: RECEIVE_UPDATE_POST,
  id,
  json
})

export function updatePost(id, title, body) {
  return function(dispatch) {
    dispatch(requestUpdatePost(id));
    
    const data = {id, title, body}
    
    const myInit = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}posts/${id}`
    const myRequest = new Request(requetsUrl, myInit);
    return fetch(myRequest)
    .then(
      response => console.log(response.json()), error => console.log('An error occured: ', error)
    )
    .then(() => dispatch(fetchPosts(null)))
  }
}

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

export function vote(id, option, type) {
  console.log('id, option, type', id, option, type);
  return function(dispatch) {
    const voteOption = option === 'upvote' ? requestUpVote(id) : requestDownVote(id);
    dispatch(voteOption);
        
    const data = {option}
    const myInit = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}${type}/${id}`
    // console.log('requetsUrl', requetsUrl);
    const myRequest = new Request(requetsUrl, myInit);
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then(() => {return dispatch(fetchPosts(null)); return dispatch(fetchComments(null))})
  }
}

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