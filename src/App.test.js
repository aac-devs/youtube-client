import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders app text', () => {
    render(<App />);
    const textElement = screen.getByText(/app/i);
    expect(textElement).toBeInTheDocument();
  });
});
