import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Post extends Component {
  // onAddPost() {
  //   const uuid = uuidGen();
  //   this.props.dispatch(addPost(uuid, `TITEL-${uuid}`, `BODY-${uuid}`));
  // }
  // 
  // onDeletePost() {
  //   this.props.dispatch(deletePost('4dd15ac9-0468-4d21-a8be-9adaf6d77c6a'));
  // }
  // 
  // onUpdatePost() {
  //   this.props.dispatch(updatePost());
  // }
  
  render() {
    console.log(this.props.comment);
    return(
      <div>
        <p>{this.props.comment.author}</p>
        <p>{this.props.comment.body}</p>
        {/* <p>{this.props.comment.category}</p>
          <p>{this.props.comment.voteScore}</p>
          <button onClick={() => this.onEditPost()} />
        <button onClick={() => this.onUpdatePost()}/> */}
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     comm: state.posts
//   }
// }

export default connect(null)(Post);