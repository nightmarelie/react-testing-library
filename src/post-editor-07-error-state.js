import * as React from 'react';
import { Redirect } from 'react-router';
import { savePost } from './api';

function Editor({ user }) {
  const [disabled, setDisabled] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    setDisabled(prevDisabled => !prevDisabled);

    const { title, content, tags } = e.target.elements;

    const newPost = {
      authorId: user.id,
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(tag => tag.trim()),
      date: new Date().toISOString(),
    };

    savePost(newPost).then(
      () => setRedirect(true),
      response => {
        setError(response.data.error);
        setDisabled(false);
      },
    );
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" name="title" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" name="content" />

      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" name="tags" />

      <button disabled={disabled} type="submit">
        Submit
      </button>
      {error ? <div role="alert">{error}</div> : null}
    </form>
  );
}

export { Editor };
