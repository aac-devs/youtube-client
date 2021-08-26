import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm';

describe('<RegisterForm />', () => {
  const openLoginHandler = jest.fn();
  const userSignUpHandler = jest.fn();

  beforeEach(() => {
    render(
      <RegisterForm onUserSignUp={userSignUpHandler} onOpenLoginForm={openLoginHandler} />
    );
  });

  test('should render the register form successfully', () => {
    expect(screen.getByText(/user register/i)).toBeInTheDocument();
    expect(screen.getByText(/already registered?/i)).toBeInTheDocument();
    expect(screen.getByTestId('signup-btn')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email../i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password../i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm your password../i)).toBeInTheDocument();
  });

  test('should call userSignUpHandler when the form is submitted', () => {
    const emailInput = screen.getByPlaceholderText(/enter your email../i);
    userEvent.type(emailInput, 'aac@mail.com');
    const password1Input = screen.getByPlaceholderText(/enter your password../i);
    userEvent.type(password1Input, '89012');
    const password2Input = screen.getByPlaceholderText(/enter your password../i);
    userEvent.type(password2Input, '89012{enter}');
    expect(userSignUpHandler).toHaveBeenCalledTimes(1);
  });
});
