import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { screen, render as rtlRender, fireEvent } from '@testing-library/react';
import { Counter } from '../redux-counter';
import { reducer } from '../redux-reducer';

const render = (
  ui,
  {
    initialStore = { count: 0 },
    store = createStore(reducer, initialStore),
    ...options
  } = {},
) => {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { ...rtlRender(ui, { wrapper: Wrapper, options }), store };
};

test('can render with redux with defaults', () => {
  render(<Counter />);

  fireEvent.click(screen.getByText('+'));
  fireEvent.click(screen.getByText('+'));
  expect(screen.getByLabelText(/count/i)).toHaveTextContent('2');

  fireEvent.click(screen.getByText('-'));
  expect(screen.getByLabelText(/count/i)).toHaveTextContent('1');
});

test('can render redux with custom initial state', () => {
  render(<Counter />, { initialStore: { count: 3 } });

  expect(screen.getByLabelText(/count/i)).toHaveTextContent('3');
});
