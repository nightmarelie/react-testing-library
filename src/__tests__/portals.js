import React from 'react';
import { render, screen } from '@testing-library/react';
import { Modal } from '../modal';

test('modal shows the children', () => {
  render(
    <Modal>
      <div data-testid="test" />
    </Modal>,
    { baseElement: document.getElementById('modal-root') },
  );

  expect(screen.getByTestId('test')).toBeInTheDocument();
});
