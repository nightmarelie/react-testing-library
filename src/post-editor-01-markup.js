import * as React from 'react';

function Editor() {
  const [disabled, setDisabled] = React.useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setDisabled(prevDisabled => !prevDisabled);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" />

      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" />

      <button disabled={disabled} type="submit">
        Submit
      </button>
    </form>
  );
}

export { Editor };
