import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('<LoadingSpinner />', () => {
  const portal = document.createElement('div');
  portal.setAttribute('id', 'spinner-root');

  test('should renders the spinner correctly', () => {
    render(<LoadingSpinner />, { container: document.body.appendChild(portal) });
    expect(screen.getByTestId('spinner-backdrop')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
