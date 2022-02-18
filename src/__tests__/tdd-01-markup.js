/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import { Editor } from '../post-editor-01-markup';

test('renders a form with title, content, tags and a submit btn', () => {
  const { getByLabelText, getByText } = render(<Editor />);

  const inputTitle = getByLabelText(/title/i);
  const inputContetn = getByLabelText(/content/i);
  const inputTags = getByLabelText(/tags/i);

  const btn = getByText(/submit/i);

  expect(inputTitle).toBeInTheDocument();
  expect(inputContetn).toBeInTheDocument();
  expect(inputTags).toBeInTheDocument();
  expect(btn).toBeInTheDocument();
});
