/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import user from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { FavoriteNumber } from '../favorite-number';

test('entering an invalid value shows an error message', () => {
  const { getByLabelText, getByRole, queryByRole, rerender } = render(
    <FavoriteNumber min={2} max={3} />,
  );

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const input = getByLabelText(/favorite number/i);

  user.type(input, '10');

  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i);

  rerender(<FavoriteNumber max={12} />);

  expect(queryByRole('alert')).not.toBeInTheDocument();
  // eslint-disable-next-line jest-dom/prefer-in-document
  expect(queryByRole('alert')).toBe(null);
});
