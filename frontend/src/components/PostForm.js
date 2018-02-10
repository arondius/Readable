import React from 'react';
import { Field, reduxForm } from 'redux-form';

let PostForm = props => {
    const mode = props.mode;
    const modeCapitalized = mode.charAt(0).toUpperCase() + mode.slice(1); 
    const { handleSubmit } = props;
    return(
      <form 
        className="create-post__container"
        onSubmit={handleSubmit}
      >
        <h2>{`${modeCapitalized}`} post</h2>

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
          />
        </div>
        <div>
          <label htmlFor="postAuthor">Post author</label>
          <Field
            name="postAuthor"
            component="input"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="postCategory">Post category</label>
          <Field
            name="postCategory"
            component="select"
          >
            <option />
            <option value="React">React</option>
            <option value="Redux">Redux</option>
            <option value="Udacity">Udacity</option>
          </Field>
        </div>
        <button className="btn btn--primary" type="submit">Submit</button>
      </form>
    )
}

PostForm = reduxForm({})(PostForm)

export default PostForm;