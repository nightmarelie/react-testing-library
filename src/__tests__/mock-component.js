/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { HiddenMessage } from '../hidden-message';

jest.mock('react-transition-group', () => {
  return {
    CSSTransition: props => (props.in ? props.children : null),
  };
});

test('shows hidden message when toggle is clicked', () => {
  const message = 'hello world!!';
  const { getByText, queryByText } = render(
    <HiddenMessage>{message}</HiddenMessage>,
  );

  const toggleBtn = getByText(/toggle/i);
  expect(queryByText(message)).not.toBeInTheDocument();

  fireEvent.click(toggleBtn);
  expect(getByText(message)).toBeInTheDocument();

  fireEvent.click(toggleBtn);
  expect(queryByText(message)).not.toBeInTheDocument();
});
