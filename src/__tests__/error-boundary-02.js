/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
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

  const { rerender } = render(
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
});
