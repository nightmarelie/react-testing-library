import React from 'react';
import { FavoriteNumber } from '../favorite-number';
import ReactDom from 'react-dom';

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div');
  ReactDom.render(<FavoriteNumber />, div);
  console.log(div.innerHTML);
  expect(div.querySelector('input').type).toBe('number');
});
