import React, { Component } from 'react';
import { connect } from 'react-redux';
import {togglePostForm} from '../actions'
import { Link } from 'react-router-dom'
import PostFormContainer from './PostFormContainer'
import VoteWidget from './VoteWidget'

class Post extends Component {  

  render() {
    const id = this.props.post.id
    const postEditForm = this.props.postEditForm

    // console.log('Post.js this.props.post.id', id);
    // console.log('Post.js this.props', this.props);
    // console.log('Post.js this.state', this.state);
    return(
      <div>
        <h1>{this.props.post.title}</h1>
        <p>{this.props.post.body}</p>
        <p>{this.props.post.author}</p>
        <p>{this.props.post.category}</p>
        <VoteWidget id={this.props.post.id} type="posts" voteScore={this.props.post.voteScore}/>

        <button onClick={() => {this.props.toggleAddPostClick(id)}}>Add Post</button>
        <button className="btn btn--primary" onClick={() => {this.props.toggleEditPostClick(id)}}>Edit Post</button>




        {/* <button onClick={this.props.dispatch(deletePost(this.props.post.id))}>Delete Post</button> */}


        {/* {console.log("postEditForm.open", postEditForm.open)} */}

        {this.props.postEditForm.open ? 
          <PostFormContainer
            mode={'edit'}
            post={this.props.post}
            id={id}
          />
        : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    postEditForm: state.postEditForm
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  toggleAddPostClick(id) {
    dispatch(togglePostForm(id, "add"))
  },
  toggleEditPostClick(id) {
    dispatch(togglePostForm(id, "edit"))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Post);