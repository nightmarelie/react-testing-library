/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import { HiddenMessage } from '../hidden-message';

test('shows hidden message when toggle is clicked', async () => {
  const message = 'hello world!!';
  const { getByText, queryByText } = render(
    <HiddenMessage>{message}</HiddenMessage>,
  );

  const toggleBtn = getByText(/toggle/i);
  expect(queryByText(message)).not.toBeInTheDocument();

  fireEvent.click(toggleBtn);
  expect(getByText(message)).toBeInTheDocument();

  fireEvent.click(toggleBtn);
  await waitFor(() => expect(queryByText(message)).not.toBeInTheDocument());
});
