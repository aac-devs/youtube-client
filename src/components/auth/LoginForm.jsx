import { useRef } from 'react';
import GoogleButton from './GoogleButton';

const LoginForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    // TODO: Validar entradas
    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };
    props.onUserSignIn(userData);
  };

  return (
    <>
      <h5>User Login</h5>
      <form onSubmit={submitHandler}>
        <input type="email" placeholder="Enter your email.." ref={emailRef} />
        <input type="password" placeholder="Enter your password.." ref={passwordRef} />
        <button type="submit" data-testid="signin-btn">
          Sign in
        </button>
      </form>
      <GoogleButton onClick={props.onGoogleClick} />
      <p onClick={props.onOpenRegisterForm}>Create a new account</p>
    </>
  );
};

export default LoginForm;
