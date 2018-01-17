export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

export const UPP_VOTE = 'UPP_VOTE';
export const DOWN_VOTE = 'DOWN_VOTE';

// Posts action creators
export const fetchPosts = () => ({
  type: FETCH_POSTS,
})

export const fetchPost = (id) => ({
  type: FETCH_POST,
  id
})

export const addPost = (id, title, body) => ({
  type: ADD_POST,
  id,
  title,
  body
})

export const deletePost = (id) => ({
  type: DELETE_POST,
  id
})

export const updatePost = (id) => ({
  type: UPDATE_POST,
  id
})

// Comments action creators
export const fetchComments = () => ({
  type: FETCH_COMMENTS,
})

export const addComment = (id) => ({
  type: ADD_COMMENT,
  id
})

export const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  id
})

export const updateComment = (id) => ({
  type: UPDATE_COMMENT,
  id
})

// Votes action creators
export const uppVote = (id) => ({
  type: UPP_VOTE,
  id
})

export const downVote = (id) => ({
  type: DOWN_VOTE,
  id
})