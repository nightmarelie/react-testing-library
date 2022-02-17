/* eslint-disable testing-library/no-dom-import */
import React from 'react';
import ReactDom from 'react-dom';
import { getQueriesForElement } from '@testing-library/dom';
import { FavoriteNumber } from '../favorite-number';

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div');
  ReactDom.render(<FavoriteNumber />, div);

  const { getByLabelText } = getQueriesForElement(div);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const input = getByLabelText(/favorite number/i);
  expect(input).toHaveAttribute('type', 'number');
});
