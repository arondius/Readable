import React, { Component } from 'react'
import PostPreview from './PostPreview'
import {connect} from 'react-redux'

import {sortPosts} from '../../actions'


import Container from '../Container'
import PostAddFormContainer from '../PostAddFormContainer'
import Sidebar from '../Sidebar'
import {Link} from 'react-router-dom'

class PostList extends Component {
  
  render() {
    return(
    <Container>
      <div className="content">
        <div>Sort by:</div>
        <button className="btn" onClick={() => this.props.dispatch(sortPosts('dateUp', this.props.posts))}>Newest</button>
        <button className="btn" onClick={() => this.props.dispatch(sortPosts('dateDown', this.props.posts))}>Oldest</button>
        <button className="btn" onClick={() => this.props.dispatch(sortPosts('populairUp', this.props.posts))}>Popular</button>
        <button className="btn" onClick={() => this.props.dispatch(sortPosts('popularDown', this.props.posts))}>Unpopulair</button>
        <ul className="postlist">
          {
            this.props.posts.length > 0 ? this.props.posts.map(
              post => 
                <li key={post.id}>
                  <PostPreview post={post} location={this.props.location} />
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
}
}

export default connect()(PostList);