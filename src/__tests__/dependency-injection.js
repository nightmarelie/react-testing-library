/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { GreetingLoader } from '../greeting-loader-02-dependency-injection';

test('load greetings on click', async () => {
  const mockLoadGreeting = jest.fn();
  mockLoadGreeting.mockResolvedValueOnce({ data: { greeting: 'Test' } });

  const { getByLabelText, getByText } = render(
    <GreetingLoader loadGreeting={mockLoadGreeting} />,
  );

  const input = getByLabelText(/name/i);
  const btn = getByText(/load/i);

  fireEvent.change(input, { target: { value: 'send value' } }); // input.value = 'send value
  fireEvent.click(btn);

  expect(mockLoadGreeting).toBeCalledWith('send value');
  expect(mockLoadGreeting).toBeCalledTimes(1);
  await waitFor(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent('Test'),
  );
});
