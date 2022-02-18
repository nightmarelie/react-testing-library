import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Redirect as MockRedirect } from 'react-router';
import { build, fake, sequence } from 'test-data-bot';
import { Editor } from '../post-editor-07-error-state';
import { savePost as mockSavePost } from '../api';

jest.mock('../api');

jest.mock('react-router', () => ({
  Redirect: jest.fn(() => null),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs().replace(/\r/g, '')),
  tags: fake(f => [f.lorem.words(), f.lorem.words(), f.lorem.words()]),
});

const userBuilder = build('User').fields({
  id: sequence(s => `user-${s}`),
});

function renderEditor() {
  const fakeMock = postBuilder();

  const fakeUser = userBuilder();

  render(<Editor user={fakeUser} />);

  screen.getByLabelText(/title/i).value = fakeMock.title;
  screen.getByLabelText(/content/i).value = fakeMock.content;
  screen.getByLabelText(/tags/i).value = fakeMock.tags.join(', ');

  const btn = screen.getByText(/submit/i);

  return {
    fakeUser,
    fakeMock,
    btn,
  };
}

test('renders a form with title, content, tags and a submit btn', async () => {
  const preDate = new Date();
  mockSavePost.mockResolvedValueOnce();

  const { fakeUser, fakeMock, btn } = renderEditor();

  fireEvent.click(btn);
  expect(btn).toBeDisabled();

  expect(mockSavePost).toHaveBeenCalledTimes(1);
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakeMock,
    authorId: fakeUser.id,
    date: expect.any(String),
  });

  const postDate = new Date();

  const time = new Date(mockSavePost.mock.calls[0][0].date).getTime();

  expect(time).toBeGreaterThanOrEqual(preDate.getTime());
  expect(time).toBeLessThanOrEqual(postDate.getTime());

  await waitFor(() =>
    expect(MockRedirect).toHaveBeenCalledWith({ to: '/' }, {}),
  );
});

test('renders an error message from the server', async () => {
  const testError = 'test error';
  mockSavePost.mockRejectedValueOnce({ data: { error: testError } });

  const { btn } = renderEditor();

  fireEvent.click(btn);

  const postError = await screen.findByRole('alert');
  expect(postError).toHaveTextContent(testError);
  // eslint-disable-next-line jest-dom/prefer-enabled-disabled
  expect(btn).not.toBeDisabled();
});
