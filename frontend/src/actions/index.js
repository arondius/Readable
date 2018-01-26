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

export const REQUEST_POST = 'REQUEST_POST';
export const requestPost = (id) => ({
  type: REQUEST_POST,
  id
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
    //console.log('fetch', fetch(requetsUrl, myInit));
    const myRequest = new Request(requetsUrl, myInit);
    return fetch(myRequest)
    .then(
      response => response.json(), error => console.log('An error occured: ', error)
    )
    .then(json => dispatch(receivePosts(category, json)))
  }
}

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
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const fetchComments = () => ({
  type: FETCH_COMMENTS,
})

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
export const UPP_VOTE = 'UPP_VOTE';
export const uppVote = (id) => ({
  type: UPP_VOTE,
  id
})

export const DOWN_VOTE = 'DOWN_VOTE';
export const downVote = (id) => ({
  type: DOWN_VOTE,
  id
})

// Category ADD_COMMENTion creators
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}