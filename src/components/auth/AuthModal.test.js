import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm';
import AuthModal from './AuthModal';
import { darkTheme } from '../../styles/themes';

describe('<AuthModal />', () => {
  const portal = document.createElement('div');
  portal.setAttribute('id', 'modal-root');

  const onCloseHandler = jest.fn();

  beforeEach(() => {
    render(
      <ThemeProvider theme={darkTheme}>
        <AuthModal onClose={onCloseHandler}>
          <RegisterForm />
        </AuthModal>
      </ThemeProvider>,
      { container: document.body.appendChild(portal) }
    );
  });

  test('should render the user register form inside the auth modal', () => {
    expect(screen.getByText(/user register/i)).toBeInTheDocument();
    expect(screen.getByText(/already registered?/i)).toBeInTheDocument();
    expect(screen.getByTestId('signup-btn')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email../i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password../i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm your password../i)).toBeInTheDocument();
  });
  test('should call the onCloseHandler when backdrop is clicked', () => {
    const backdrop = screen.getByTestId('auth-backdrop');
    userEvent.click(backdrop);
    expect(onCloseHandler).toHaveBeenCalledTimes(1);
  });
});
