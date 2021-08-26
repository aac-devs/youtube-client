import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  const openRegisterHandler = jest.fn();
  const googleClickHandler = jest.fn();
  const userSignInHandler = jest.fn();

  beforeEach(() => {
    render(
      <LoginForm
        onUserSignIn={userSignInHandler}
        onGoogleClick={googleClickHandler}
        onOpenRegisterForm={openRegisterHandler}
      />
    );
  });

  test('should render the login form successfully', () => {
    expect(screen.getByText(/user login/i)).toBeInTheDocument();
    expect(screen.getByText(/create a new account/i)).toBeInTheDocument();
    expect(screen.getByTestId('signin-btn')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email../i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password../i)).toBeInTheDocument();
    expect(screen.getByTestId('google-button')).toBeInTheDocument();
  });

  test('should call googleClickHandler function whe google button is clicked', () => {
    const googleBtn = screen.getByTestId('google-button');
    userEvent.click(googleBtn);
    expect(googleClickHandler).toHaveBeenCalledTimes(1);
  });
  
  test('should call userSignInHandler when the form is submitted', () => {
    const emailInput = screen.getByPlaceholderText(/enter your email../i);
    userEvent.type(emailInput, 'aac@mail.com');
    const passwordInput = screen.getByPlaceholderText(/enter your password../i);
    userEvent.type(passwordInput, '89012{enter}');
    expect(userSignInHandler).toHaveBeenCalledTimes(1);
  });
});
