import React from 'react';
import { Field, reduxForm } from 'redux-form';

let CommentEditForm = props => {
    const { handleSubmit, initialValues } = props;
    return(
      <form 
        className="create-post__container"
        onSubmit={handleSubmit}
      >
        <h2>Edit comment</h2>
        <div>
          <label htmlFor="postBody">Comment</label>
          <Field
            name="postBody"
            component="textarea"
            type="text"
            value={props.initialValues.body}
          />
        </div>
        <button className="btn btn--primary" type="submit">Submit</button>
      </form>
    )
}

CommentEditForm = reduxForm()(CommentEditForm)

export default CommentEditForm;