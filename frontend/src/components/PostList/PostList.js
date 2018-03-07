import React from 'react'
import PostPreview from './PostPreview'

import Container from '../Container'
import PostAddFormContainer from '../PostAddFormContainer'
import Sidebar from '../Sidebar'
import {Link} from 'react-router-dom'

const PostList = (props) => (
  
    <Container>
      <div className="content">
        <ul className="postlist">
          {
            props.posts.length > 0 ? props.posts.map(
              post => 
                <li key={post.id}>
                  <PostPreview post={post} location={props.location} />
                </li>
            ) : <li>No posts available</li>
          }
        </ul>
      </div>
      <Sidebar>
        <h2>Categories:</h2>
        <ul>
          <li>
            <Link to="/category/react">React</Link>
          </li>
          <li>
            <Link to="/category/redux">Redux</Link>
          </li>
          <li>
            <Link to="/category/udacity">Udacity</Link>
          </li>
        </ul>
        <PostAddFormContainer />
      </Sidebar>
    </Container>
)

export default PostList;