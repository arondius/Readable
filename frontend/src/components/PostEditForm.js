import React from 'react';
import { Field, reduxForm } from 'redux-form';

let PostForm = props => {
    const { handleSubmit, initialValues } = props;
    return(
      <form 
        className="create-post__container"
        onSubmit={handleSubmit}
      >
        <h2>Edit post</h2>

        <div>
          <label htmlFor="postTitle">Post title</label>
          <Field
            name="postTitle"
            component="input"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="postBody">Post body</label>
          <Field
            name="postBody"
            component="textarea"
            type="text"
            value={initialValues.body}
          />
        </div>
        <button className="btn btn--primary" type="submit">Submit</button>
      </form>
    )
}

PostForm = reduxForm()(PostForm)

export default PostForm;