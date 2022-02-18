import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { screen, render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Main } from '../main';

function render(ui, options) {
  function Wrapper({ children }) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }
  return rtlRender(ui, {
    wrapper: Wrapper,
    ...options,
  });
}

test('main renders about and home and I can navigate to those pages', () => {
  window.history.pushState({}, 'Test page', '/');
  render(<Main />);

  expect(screen.getByRole('heading')).toHaveTextContent(/home/i);
  userEvent.click(screen.getByText(/about/i));
  expect(screen.getByRole('heading')).toHaveTextContent(/about/i);
});

test('landing on a bad page shows no match component', () => {
  window.history.pushState({}, 'Test page', '/something-that-does-not-match');
  render(<Main />);

  expect(screen.getByRole('heading')).toHaveTextContent(/404/i);
});
