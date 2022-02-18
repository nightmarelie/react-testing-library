import React from 'react';
import { render, act } from '@testing-library/react';
import { useCounter } from '../use-counter';
// import { render, act } from '@testing-library/react-hooks'

function setup(initialProps = {}) {
  const result = {};
  function TestComponent(props) {
    result.current = useCounter(props);

    return null;
  }

  render(<TestComponent {...initialProps} />);

  return result;
}

test('exposes the count and increment/decrement functions', () => {
  const result = setup();

  expect(result.current.count).toBe(0);
  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(1);
  act(() => {
    result.current.decrement();
  });
  expect(result.current.count).toBe(0);
});

test('allows customization of the initial count', () => {
  const result = setup({ initialCount: 3 });
  expect(result.current.count).toBe(3);
});

test('allows customization of the step', () => {
  const result = setup({ step: 3 });
  expect(result.current.count).toBe(0);
  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(3);
});
