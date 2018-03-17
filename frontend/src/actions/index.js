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

// Categories action creators
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
})

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
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
    const myRequest = new Request(requetsUrl, myInit);
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then(json => {
      // console.log(json);
      dispatch(receiveCategories(json))}
    )
  }
}

// Category  creators
export const GET_POSTS_IN_CATEGORY = 'GET_POSTS_IN_CATEGORY'
export const getPostsInCategory = (category) => ({
  type: GET_POSTS_IN_CATEGORY,
  category
})

export const REQUEST_SAVE_POST = 'REQUEST_SAVE_POST';
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
    const myRequest = new Request(requetsUrl, myInit);
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
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

export const REQUEST_DELETE_POST = 'REQUEST_DELETE_POST';
export const requestDeletePost = () => ({
  type: REQUEST_DELETE_POST,
})

export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST';
export const receiveDeletePost = (id) => ({
  type: RECEIVE_DELETE_POST,
  id
})

export const DELETE_POST = 'DELETE_POST';
export function deletePost(id) {
  return function(dispatch) {
    dispatch(requestDeletePost());
    const data = {id}
        
    const myInit = {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}posts/${id}`
    const myRequest = new Request(requetsUrl, myInit);
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then((json) => dispatch(receiveDeletePost(id)))
  }
}

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
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then((json) => {
      dispatch(receiveUpdatePost(id, json))
      dispatch(closePostForm(id))
    })
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

export const REQUEST_DELETE_COMMENT = 'REQUEST_DELETE_COMMENT';
export const requestDeleteComment = (id) => ({
  type: REQUEST_DELETE_COMMENT,
  id
})

export const RECEIVE_DELETE_COMMENT = 'RECEIVE_DELETE_COMMENT';
export const receiveDeleteComment = (id) => ({
  type: RECEIVE_DELETE_COMMENT,
  id
})

export function deleteComment(id = null) {
  return function(dispatch) {
    dispatch(requestDeleteComment(id));
    const data = {id}
        
    const myInit = {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}comments/${id}`
    const myRequest = new Request(requetsUrl, myInit);
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then((json) => dispatch(receiveDeleteComment(id)))
  }
}


export const REQUEST_UPDATE_COMMENT = 'REQUEST_UPDATE_COMMENT';
export const requestUpdateComment = (id) => ({
  type: REQUEST_UPDATE_COMMENT,
  id
})


export const RECEIVE_UPDATE_COMMENT = 'RECEIVE_UPDATE_COMMENT';
export const receiveUpdateComment = (id, json) => ({
  type: RECEIVE_UPDATE_COMMENT,
  id,
  json
})

export function updateComment(id, body) {
  return function(dispatch) {
    dispatch(requestUpdateComment(id));
    
    const data = {id, body}
    
    const myInit = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: myHeaders,
    }
    
    const requetsUrl = `${url}comments/${id}`
    const myRequest = new Request(requetsUrl, myInit);
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

export const RECEIVE_VOTE = 'RECEIVE_VOTE';
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
    const myRequest = new Request(requetsUrl, myInit);
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then(
      (json) => {
        return dispatch(receiveVote(id, json.voteScore, type));
      }
    )
  }
}

export const TOGGLE_POST_FORM = 'TOGGLE_POST_FORM'
export const togglePostForm = (id) => ({
  type: TOGGLE_POST_FORM,
  id,
})

export const CLOSE_POST_FORM = 'CLOSE_POST_FORM'
export const closePostForm = (id) => ({
  type: CLOSE_POST_FORM,
  id
})

export const SORT_POSTS = 'SORT_POSTS'
export const sortPosts = (method, items) => ({
  type: SORT_POSTS,
  method,
  items
})