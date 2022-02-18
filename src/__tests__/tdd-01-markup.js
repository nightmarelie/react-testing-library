/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Editor } from '../post-editor-01-markup';

test('renders a form with title, content, tags and a submit btn', async () => {
  const { getByLabelText, getByText } = render(<Editor />);

  const inputTitle = getByLabelText(/title/i);
  const inputContent = getByLabelText(/content/i);
  const inputTags = getByLabelText(/tags/i);

  const btn = getByText(/submit/i);

  expect(inputTitle).toBeInTheDocument();
  expect(inputContent).toBeInTheDocument();
  expect(inputTags).toBeInTheDocument();
  expect(btn).toBeInTheDocument();

  fireEvent.click(btn);

  await waitFor(() => expect(btn).toBeDisabled());
});
