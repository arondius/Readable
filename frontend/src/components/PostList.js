import React, { Component } from 'react';
import Post from './Post';
import { fetchPosts } from '../actions'
import { connect } from 'react-redux';

class PostList extends Component {
  componentDidMount() {
    if(!this.props.postList) {
      this.props.dispatch(fetchPosts());
    }
  }

  render() {
    return(
      <ul>
        {this.props.postList.map(post => <li key={post.id}><Post post={post} /></li>)}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    postList: state.posts,
  }
}

export default connect(mapStateToProps)(PostList)