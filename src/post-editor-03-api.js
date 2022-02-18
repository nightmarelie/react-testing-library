import * as React from 'react';
import { savePost } from './api';

function Editor({ user }) {
  const [disabled, setDisabled] = React.useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setDisabled(prevDisabled => !prevDisabled);

    const { title, content, tags } = e.target.elements;

    const newPost = {
      authorId: user.id,
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(tag => tag.trim()),
    };

    savePost(newPost);
  };

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
    </form>
  );
}

export { Editor };
