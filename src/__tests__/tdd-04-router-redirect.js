import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Redirect as MockRedirect } from 'react-router';
import { Editor } from '../post-editor-04-router-redirect';
import { savePost as mockSavePost } from '../api';

jest.mock('../api');

jest.mock('react-router', () => ({
  Redirect: jest.fn(() => null),
}));

afterEach(() => {
  jest.clearAllMocks();
});

test('renders a form with title, content, tags and a submit btn', async () => {
  mockSavePost.mockResolvedValueOnce();
  const fakeMock = {
    title: 'Test title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  };

  const fakeUser = { id: 'user-id' };

  render(<Editor user={fakeUser} />);

  screen.getByLabelText(/title/i).value = fakeMock.title;
  screen.getByLabelText(/content/i).value = fakeMock.content;
  screen.getByLabelText(/tags/i).value = fakeMock.tags.join(', ');

  const btn = screen.getByText(/submit/i);

  fireEvent.click(btn);
  expect(btn).toBeDisabled();

  expect(mockSavePost).toHaveBeenCalledTimes(1);
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakeMock,
    authorId: fakeUser.id,
  });

  await waitFor(() =>
    expect(MockRedirect).toHaveBeenCalledWith({ to: '/' }, {}),
  );
});
