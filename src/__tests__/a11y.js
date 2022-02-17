import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import Form from '../form';

test('the form is accessible', async () => {
  const { container } = render(<Form />);

  const result = await axe(container);

  expect(result).toHaveNoViolations();
});
