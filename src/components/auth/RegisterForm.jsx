import { useRef } from 'react';

const RegisterForm = (props) => {
  const emailRef = useRef();
  const password1Ref = useRef();
  const password2Ref = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log('submit handler');
    const enteredEmail = emailRef.current.value;
    const entered1Password = password1Ref.current.value;
    // const entered2Password = password2Ref.current.value;

    // TODO: Validar entradas
    const userData = {
      email: enteredEmail,
      password: entered1Password,
    };

    props.onUserSignUp(userData);
  };
  return (
    <>
      <h5>User Register</h5>
      <form onSubmit={submitHandler}>
        {/* <input type="text" placeholder="Enter your name.." /> */}
        <input
          type="email"
          placeholder="Enter your email.."
          ref={emailRef}
          defaultValue="user@mail.com"
        />
        <input
          type="password"
          placeholder="Enter your password.."
          ref={password1Ref}
          defaultValue="123456"
        />
        <input
          type="password"
          placeholder="Confirm your password.."
          ref={password2Ref}
          defaultValue="123456"
        />
        <button type="submit">Sign up</button>
      </form>
      <p onClick={props.onOpenLoginForm}>Already registered?</p>
    </>
  );
};

export default RegisterForm;
