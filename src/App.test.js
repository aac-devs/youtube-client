import { ThemeProvider } from 'styled-components';
import {
  act,
  cleanup,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { AppContextProvider } from './context/app-context';
import { darkTheme } from './styles/themes';
import mockListInitial from './mock/list/initial.json';
import mockListDurations from './mock/list/durations.json';
import mockListLogos from './mock/list/logos.json';
import mockListResult from './mock/list/result.json';
import userEvent, { specialChars } from '@testing-library/user-event';
import urls from './mock/urls.json';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import App from './App';
import { AuthContextProvider } from './context/auth-context';
import { LocalStorageMock } from '@react-mock/localstorage';
import fetchMock from 'fetch-mock';

const baseUrl = process.env.REACT_APP_BASE_URL;

describe('<App />', () => {
  const history = createMemoryHistory();

  const localUser = null;
  // JSON.stringify({
  //   uid: 'EJsDAFvLZCGM60vZO2WIXKDj6fG9',
  //   displayName: null,
  //   photoURL: null,
  // });
  // JSON.stringify(localUser)

  beforeAll(() => {
    fetchMock.config.fallbackToNetwork = true;
  });

  beforeEach(() => {
    fetchMock.restore();
    fetchMock.get(urls.list.initial, JSON.stringify(mockListInitial));
    fetchMock.get(urls.list.durations, JSON.stringify(mockListDurations));
    fetchMock.get(urls.list.logos, JSON.stringify(mockListLogos));
    // console.log(fetchMock.config);

    render(
      <LocalStorageMock items={{ storedUser: localUser, storedTheme: 'DARK' }}>
        <ThemeProvider theme={darkTheme}>
          <AppContextProvider>
            <AuthContextProvider>
              <Router history={history}>
                <App />
              </Router>
            </AuthContextProvider>
          </AppContextProvider>
        </ThemeProvider>
      </LocalStorageMock>
    );
  });

  afterEach(() => {});

  afterAll(() => {});

  const registerUser = async () => {
    // Activar el botón de login y esperar que el modal aparezca:
    const loginBtn = screen.getByTestId('login-btn');
    expect(loginBtn).toBeInTheDocument();
    userEvent.click(loginBtn);
    await waitFor(() => {
      expect(screen.getByTestId('signin-btn')).toBeInTheDocument();
    });

    // Activar el botón de crear nueva cuenta y esperar que el formulario de registro aparezca:
    const createAccount = screen.getByText(/create a new account/i);
    expect(createAccount).toBeInTheDocument();
    userEvent.click(createAccount);
    await waitFor(() => {
      expect(screen.getByTestId('signup-btn')).toBeInTheDocument();
    });

    // Cargar un usuario random en el input del email
    const emailInput = screen.getByPlaceholderText(/enter your email../i);
    userEvent.clear(emailInput);
    userEvent.type(emailInput, `user${Math.floor(Math.random() * 10000)}@mail.com`);

    // Confirmar con un Enter en el input de confirmación de password y esperar que el formulario de registro desaparezca:
    const password2Input = screen.getByPlaceholderText(/confirm your password../i);
    userEvent.type(password2Input, '123456{enter}');

    await waitForElementToBeRemoved(password2Input);
    // await new Promise((r) => setTimeout(r, 1000));

    // await waitFor(() => screen.queryByTestId('hola-no-esta'), {
    //   timeout: 5000,
    // });
    // await waitForElementToBeRemoved(screen.findByTestId('no-logged-user'));
  };

  // test('should render a list of mocked videos at the beginning', async () => {
  //   await waitForSpinnerRenders();
  //   const videosListItems = await screen.findAllByTestId(/video-item/i);
  //   expect(videosListItems.length).toBe(10);
  //   await expect(screen.queryByTestId('no-logged-user')).toBeInTheDocument();
  // });

  // test('shoul', async () => {
  //   console.time('label');
  //   await waitForSpinnerRenders();
  //   // Activar el botón de crear nueva cuenta y esperar que el formulario de registro aparezca:
  //   await waitForLogginButton();

  //   const createAccount = screen.getByText(/create a new account/i);
  //   expect(createAccount).toBeInTheDocument();
  //   userEvent.click(createAccount);
  //   await waitFor(() => {
  //     expect(screen.getByTestId('signup-btn')).toBeInTheDocument();
  //   });

  //   // Confirmar con un Enter en el input de confirmación de password y esperar que el formulario de registro desaparezca:
  //   const password2Input = screen.getByPlaceholderText(/confirm your password../i);
  //   userEvent.type(password2Input, '123456{enter}');
  //   await waitForElementToBeRemoved(password2Input);

  //   let errorModal;
  //   await waitFor(
  //     async () => {
  //       errorModal = await screen.queryByTestId('error-card-title');
  //       console.log(errorModal);
  //       if (errorModal) {
  //         console.log('error, usuario ya registrado');
  //         expect(errorModal).toBeInTheDocument();
  //         const aceptBtn = await screen.getByTestId('error-card-button');
  //         userEvent.click(aceptBtn);
  //         // await waitForElementToBeRemoved(aceptBtn);

  //         // const loginBtn = screen.getByTestId('login-btn');
  //         // expect(loginBtn).toBeInTheDocument();
  //         // userEvent.click(loginBtn);
  //         // await waitFor(() => {
  //         //   expect(screen.getByTestId('signin-btn')).toBeInTheDocument();
  //         // });
  //         await waitForLogginButton();

  //         console.log('entra al waitfor -------------------------------------');
  //         console.timeEnd('label');
  //         const passwordInput = screen.getByPlaceholderText(/enter your password../i);
  //         userEvent.type(passwordInput, specialChars.enter);
  //         const loginButton = screen.getByTestId(/login-btn/i);
  //         await waitFor(() => {
  //           expect(loginButton).not.toBeInTheDocument();
  //         });
  //         screen.debug(screen.getByTestId(/login-btn/i));
  //         // await waitForElementToBeRemoved(screen.getByTestId('login-btn'));
  //       } else {
  //         expect(errorModal).not.toBeInTheDocument();
  //       }
  //     },
  //     { timeout: 20000 }
  //   );
  // });

  it('timer', async () => {
    expect(await screen.getByTestId('spinner-backdrop')).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.queryByTestId('spinner-backdrop'));
    expect((await screen.findAllByTestId(/video-item/i)).length).toBe(10);
  });

  it('timer 2', async () => {
    console.log('---------------------------------------------');
    console.time('timer');
    expect(await screen.getByTestId('spinner-backdrop')).toBeInTheDocument();

    // Verifica que el usuario no esté logueado:
    expect(screen.getByTestId('login-btn')).toBeInTheDocument();

    // Abre el login modal:
    expect(screen.getByTestId(/login-btn/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(/login-btn/i));
    expect(await screen.findByTestId('signin-btn')).toBeInTheDocument();

    // Cambia al formulario de registro:
    userEvent.click(screen.getByText(/create a new account/i));
    expect(screen.getByText(/user register/i)).toBeInTheDocument();

    // fillRegisterForm();
    userEvent.type(screen.getByPlaceholderText(/enter your email../i), 'aac@mail.com');
    userEvent.type(screen.getByPlaceholderText(/enter your password../i), '123456');
    userEvent.type(
      screen.getByPlaceholderText(/confirm your password../i),
      '123456{enter}'
    );

    await waitForElementToBeRemoved(screen.getByText(/user register/i));
    if (screen.queryByText(/authentication error/i)) {
      // Error, el usuario que intenta crear ya existe
      expect(screen.getByTestId(/login-btn/i)).toBeInTheDocument();
      expect(screen.getByText(/the email address is already in/i)).toBeInTheDocument();
    } else {
      // Se creó un nuevo usuario, ya se encuentra logueado
      expect(screen.getByTestId(/login-btn-/i)).toBeInTheDocument();
    }

    console.log('#############################################');
    console.timeEnd('timer');
    // screen.debug();
  });

  // it('timer 2', async () => {
  //   console.log('---------------------------------------------');
  //   console.time('timer');
  //   // screen.debug();
  //   const videosListItems = await screen.findAllByTestId(/video-item/i);
  //   expect(videosListItems.length).toBe(10);
  //   // const spinner = await screen.getByTestId('spinner-backdrop');
  //   // expect(spinner).toBeInTheDocument();
  //   // await waitForElementToBeRemoved(screen.queryByTestId('spinner-backdrop'));
  //   expect(true).toBe(true);
  //   console.log('#############################################');
  //   console.timeEnd('timer');
  // });

  // test('should register a new user', async () => {
  // Esperar a que el spinner aparezca y desaparezca:
  // const spinner = await screen.getByTestId('spinner-backdrop');
  // expect(spinner).toBeInTheDocument();
  // await waitForElementToBeRemoved(screen.queryByTestId('spinner-backdrop'));
  // await waitForSpinnerRenders();
  // Confirmar que la lista de videos sea cargada en el home:
  // const videosListItems = await screen.findAllByTestId(/video-item/i);
  // expect(videosListItems.length).toBe(10);
  // await registerUser();
  // Registrar usuario random:
  // Finalmente, verificar que no aparezca el ícono de usuario no logueado:
  // await expect(screen.queryByTestId('no-logged-user')).not.toBeInTheDocument();
  // TODO: PROBLEMA CON ADD, recuerde que instalé un paquete y modifiqué en dos partes el package.json.
  // });

  // test('add favorites to', async () => {
  // Esperar a que el spinner aparezca y desaparezca:
  // const spinner = await screen.getByTestId('spinner-backdrop');
  // expect(spinner).toBeInTheDocument();
  // await waitForElementToBeRemoved(screen.queryByTestId('spinner-backdrop'));
  // await waitForSpinnerRenders();
  // // Confirmar que la lista de videos sea cargada en el home:
  // let videosListItems = await screen.findAllByTestId(/video-item/i);
  // expect(videosListItems.length).toBe(10);
  // // Registrar usuario
  // await registerUser();
  // // console.log(mockListResult.data[0].videoId);
  // const favButtons = await screen.findAllByTestId(/fav-add-button/i);
  // userEvent.click(favButtons[0]);
  // const favButtonAdded = await screen.findByTestId(
  //   `fav-remove-button-${mockListResult.data[0].videoId}`
  // );
  // expect(favButtonAdded).toBeInTheDocument();
  // screen.debug(favButtonAdded);
  // });
});
