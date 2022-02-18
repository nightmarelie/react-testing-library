/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { reportError as mockReportError } from '../api';
import { ErrorBoundary } from '../error-boundary';

jest.mock('../api');

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  console.error.mockRestore();
});

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

function Bomb({ sholdThrow }) {
  if (sholdThrow) {
    throw new Error('Booom!');
  } else {
    return null;
  }
}

test('calls reportError and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({
    data: { success: true },
  });

  const { rerender, getByText, getByRole, queryByRole, queryByText } = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  );

  rerender(
    <ErrorBoundary>
      <Bomb sholdThrow />
    </ErrorBoundary>,
  );

  const error = expect.any(Error);
  const info = { componentStack: expect.stringContaining('Bomb') };

  expect(mockReportError).toHaveBeenCalledWith(error, info);
  expect(mockReportError).toHaveBeenCalledTimes(1);

  expect(console.error).toHaveBeenCalledTimes(2);

  mockReportError.mockClear();
  console.error.mockClear();

  expect(getByRole('alert').textContent).toMatchInlineSnapshot(
    `"There was a problem."`,
  );

  rerender(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  );

  fireEvent.click(getByText(/try again/i));

  expect(mockReportError).not.toBeCalled();
  expect(console.error).not.toBeCalled();
  expect(queryByRole('alert')).not.toBeInTheDocument();
  expect(queryByText(/try again/i)).not.toBeInTheDocument();
});
