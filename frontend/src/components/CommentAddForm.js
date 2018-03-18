import React from 'react';
import { Field, reduxForm } from 'redux-form';

let CommentForm = props => {
    const { handleSubmit } = props;
    return(
      <form 
        className="create-post__container"
        onSubmit={handleSubmit}
      >
        <h2>Add comment</h2>

        <div>
          <label htmlFor="postBody">Comment body</label>
          <Field
            name="commentBody"
            component="textarea"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="postAuthor">Comment author</label>
          <Field
            name="commentAuthor"
            component="input"
            type="text"
          />
        </div>
        <button className="btn btn--primary" type="submit">Submit</button>
      </form>
    )
}

CommentForm = reduxForm()(CommentForm)

export default CommentForm;