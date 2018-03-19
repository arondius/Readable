import React, { Component } from 'react'
import PostPreview from './PostPreview'
import {connect} from 'react-redux'

import {sortPosts} from '../../actions/postActions'


import Container from '../Container'
import PostAddFormContainer from '../PostAddFormContainer'
import Sidebar from '../Sidebar'
import {Link} from 'react-router-dom'

class PostList extends Component {
  
  render() {
    return(
    <Container>
      <div className="content">
        {
          this.props.match.params.category ?
            <Link to="/">
              <i className="fas fa-arrow-circle-left heading-icon heading-icon--left"></i>
              Back to the list of Posts
            </Link> : 
          null
        }
        <div>Sort by:</div>
        <button className="btn" onClick={() => this.props.dispatch(sortPosts('dateUp', this.props.allPosts))}>Newest</button>
        <button className="btn" onClick={() => this.props.dispatch(sortPosts('dateDown', this.props.allPosts))}>Oldest</button>
        <button className="btn" onClick={() => this.props.dispatch(sortPosts('populairUp', this.props.allPosts))}>Popular</button>
        <button className="btn" onClick={() => this.props.dispatch(sortPosts('popularDown', this.props.allPosts))}>Unpopulair</button>
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
          {this.props.categories.map(
            (category) => (
              <li key={category.name}>
                <Link to={`/category/${category.path}`}>
                  {category.name}
                </Link>
              </li>
            )
          )}
        </ul>
        <PostAddFormContainer />
      </Sidebar>
    </Container>
  )
}
}

function mapStateToProps(state) {
  return {
    categories: state.categories.items,
    allPosts: state.posts.items
  }
}

export default connect(mapStateToProps)(PostList);