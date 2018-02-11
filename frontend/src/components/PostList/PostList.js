import React from 'react'
import PostPreview from '../PostPreview'

const PostList = (props) => (
  <ul className="postlist">
    {
      props.postList.map(
        post => 
          <li key={post.id}>
            <PostPreview post={post} location={props.location} />
          </li>
      )
    }
  </ul>
)

export default  PostList;