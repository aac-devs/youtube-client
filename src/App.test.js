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

import mockRelatedInitial from './mock/relatedToId/initial.json';
import mockRelatedDurations from './mock/relatedToId/durations.json';
import mockRelatedLogos from './mock/relatedToId/logos.json';

import mockSingleInitial from './mock/single/initial.json';
import mockSingleDurations from './mock/single/durations.json';
import mockSingleLogos from './mock/single/logos.json';
import userEvent, { specialChars } from '@testing-library/user-event';
import urls from './mock/urls.json';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import App from './App';
import { AuthContextProvider } from './context/auth-context';
import { LocalStorageMock } from '@react-mock/localstorage';
import fetchMock from 'fetch-mock-jest';

describe('<App />', () => {
  const history = createMemoryHistory();
  const localUser = null;

  beforeEach(() => {
    // jest.useFakeTimers();
    fetchMock.config.fallbackToNetwork = true;

    // fetchMock.mock = function (matcher, response, options) {
    //   console.log({ matcher });
    //   console.log({ response });
    //   console.log({ options });
    //   return {};
    // };

    // fetchMock.restore();
    // fetchMock.catch();

    // fetchMock
    //   .get(urls.list.initial, JSON.stringify(mockListInitial))
    //   .get(urls.list.durations, JSON.stringify(mockListDurations))
    //   .get(urls.list.logos, JSON.stringify(mockListLogos))

    // .get(urls.single.initial, JSON.stringify(mockSingleInitial))
    // .get(urls.single.durations, JSON.stringify(mockSingleDurations))
    // .get(urls.single.logos, JSON.stringify(mockSingleLogos))

    // .get(urls.related.initial, JSON.stringify(mockRelatedInitial))
    // .get(urls.related.durations, JSON.stringify(mockRelatedDurations))
    // .get(urls.related.logos, JSON.stringify(mockRelatedLogos));

    // .catch((url) => {
    //   console.log({ url });
    //   return url;
    // });

    // render(
    //   <LocalStorageMock items={{ storedUser: localUser, storedTheme: 'DARK' }}>
    //     <ThemeProvider theme={darkTheme}>
    //       <AppContextProvider>
    //         <AuthContextProvider>
    //           <Router history={history}>
    //             <App />
    //           </Router>
    //         </AuthContextProvider>
    //       </AppContextProvider>
    //     </ThemeProvider>
    //   </LocalStorageMock>
    // );
  });

  afterEach(() => {
    // jest.useRealTimers();
  });

  afterAll(() => {
    console.log(fetchMock.calls());
  });

  // it('intenta registrar un nuevo usuario, si ya está registrado muestra un error, de lo contrario, lo registra satisfactoriamente', async () => {
  //   // Espera que se renderice el loading spinner
  //   expect(await screen.getByTestId('spinner-backdrop')).toBeInTheDocument();

  //   // Espera que se rendericen los videos en la homeview
  //   expect((await screen.findAllByTestId(/video-item/i)).length).toBe(10);

  //   // Verifica que el usuario no esté logueado:
  //   expect(screen.getByTestId('login-btn')).toBeInTheDocument();

  //   // Abre el login modal:
  //   expect(screen.getByTestId(/login-btn/i)).toBeInTheDocument();
  //   userEvent.click(screen.getByTestId(/login-btn/i));
  //   expect(await screen.findByTestId('signin-btn')).toBeInTheDocument();

  //   // Cambia al formulario de registro:
  //   userEvent.click(screen.getByText(/create a new account/i));
  //   expect(screen.getByText(/user register/i)).toBeInTheDocument();

  //   // Llena los datos de nuevo usuario en los campos de texto, se submitea después de confirmar la contraseña:
  //   userEvent.type(screen.getByPlaceholderText(/enter your email../i), 'aac@mail.com');
  //   userEvent.type(screen.getByPlaceholderText(/enter your password../i), '123456');
  //   userEvent.type(
  //     screen.getByPlaceholderText(/confirm your password../i),
  //     '123456{enter}'
  //   );

  //   // Espera que se remueva el formulario de registro
  //   await waitForElementToBeRemoved(screen.getByText(/user register/i));

  //   // Muestra un modal con error de registro o carga la imagen en el botón de login
  //   if (screen.queryByText(/authentication error/i)) {
  //     // Error, el usuario que intenta crear ya existe
  //     expect(screen.getByTestId(/login-btn/i)).toBeInTheDocument();
  //     expect(screen.getByText(/the email address is already in/i)).toBeInTheDocument();
  //   } else {
  //     // Se creó un nuevo usuario, ya se encuentra logueado
  //     expect(screen.getByTestId(/login-btn-/i)).toBeInTheDocument();
  //     expect(await screen.findAllByTestId(/fav-add-button-/i)).toBeInTheDocument();
  //   }
  // });

  // it('loguea un usuario y agrega favoritos a la lista de favoritos', async () => {
  //   fetchMock
  //     .get(urls.list.initial, JSON.stringify(mockListInitial))
  //     .get(urls.list.durations, JSON.stringify(mockListDurations))
  //     .get(urls.list.logos, JSON.stringify(mockListLogos));

  //   render(
  //     <LocalStorageMock items={{ storedUser: localUser, storedTheme: 'DARK' }}>
  //       <ThemeProvider theme={darkTheme}>
  //         <AppContextProvider>
  //           <AuthContextProvider>
  //             <Router history={history}>
  //               <App />
  //             </Router>
  //           </AuthContextProvider>
  //         </AppContextProvider>
  //       </ThemeProvider>
  //     </LocalStorageMock>
  //   );

  //   // Espera que se renderice el loading spinner
  //   expect(await screen.getByTestId('spinner-backdrop')).toBeInTheDocument();
  //   const videosList = await screen.findAllByTestId(/video-item/i);
  //   expect(videosList[0]).toBeInTheDocument();
  //   fetchMock.restore();

  //   // Verifica que el usuario no esté logueado:
  //   expect(screen.getByTestId('login-btn')).toBeInTheDocument();

  //   // Abre el login modal:
  //   expect(screen.getByTestId(/login-btn/i)).toBeInTheDocument();
  //   userEvent.click(screen.getByTestId(/login-btn/i));
  //   expect(await screen.findByTestId('signin-btn')).toBeInTheDocument();

  //   // Llena los datos del usuario (usuario registrado en el test anterior) y submitea el formulario.
  //   userEvent.type(screen.getByPlaceholderText(/enter your email../i), 'aac@mail.com');
  //   userEvent.type(
  //     screen.getByPlaceholderText(/enter your password../i),
  //     '123456{enter}'
  //   );

  //   // Espera que se remueva el formulario de registro
  //   await waitForElementToBeRemoved(screen.getByText(/user login/i));

  //   // Muestra un modal con error de login o carga la imagen en el botón de login
  //   if (screen.queryByText(/authentication error/i)) {
  //     // Error, el usuario no se encuentra registrado
  //     expect(screen.getByTestId(/login-btn/i)).toBeInTheDocument();
  //     expect(
  //       screen.getByText(/there is no user record corresponding to this/i)
  //     ).toBeInTheDocument();
  //   } else {
  //     // se logueó satisfactoriamente
  //     expect(screen.getByTestId(/login-btn-/i)).toBeInTheDocument();
  //   }

  //   // Obtener los botones de favoritos que corresponden a videos que se pueden eliminar de favoritos
  //   const favVideosAdded = await screen.findAllByTestId(/fav-remove-button/i);
  //   expect(favVideosAdded[0]).toBeInTheDocument();

  //   // Obtener los botones de favoritos que corresponden a videos que se pueden agregar a favoritos
  //   const videosFavButton = await screen.findAllByTestId(/fav-add-button-/i);
  //   expect(videosFavButton[0]).toBeInTheDocument();

  //   // screen.debug(favVideosAdded);
  //   // screen.debug(videosFavButton);
  //   expect(favVideosAdded.length).toBe(3);
  //   expect(videosFavButton.length).toBe(7);

  //   // Estos eventos se deben ejecutar la primera vez que se corren las pruebas para que cargar los tres favoritos en el emulador de la base de datos, obviamente, esta primera prueba fallará.
  //   // userEvent.click(videosFavButton[0]);
  //   // userEvent.click(videosFavButton[1]);
  //   // userEvent.click(videosFavButton[2]);

  //   // Confirma que estamos en la ruta /videos
  //   expect(history.location.pathname).toBe('/videos');

  //   // Hace click en el item favoritos del menú:
  //   userEvent.click(screen.getByTestId(/login-btn/i));
  //   userEvent.click(screen.getByTestId(/menu-fav-right-btn/i));

  //   // Confirma que pasamos a la ruta /favorites
  //   expect(history.location.pathname).toBe('/favorites');
  //   // Espero que se renderice una lista con 3 favoritos
  //   const favs = await screen.findAllByTestId(/video-item-favorites/i);
  //   expect(favs[0]).toBeInTheDocument();
  //   expect(favs.length).toBe(3);
  // });

  it('otro test', async () => {
    fetchMock
      .get(urls.list.initial, JSON.stringify(mockListInitial))
      .get(urls.list.durations, JSON.stringify(mockListDurations))
      .get(urls.list.logos, JSON.stringify(mockListLogos))

      .get(urls.single.initial, JSON.stringify(mockSingleInitial))
      .get(urls.related.initial, JSON.stringify(mockRelatedInitial))
      .get(urls.single.durations, JSON.stringify(mockSingleDurations))
      .get(urls.related.durations, JSON.stringify(mockRelatedDurations))
      .get(urls.single.logos, JSON.stringify(mockSingleLogos))

      .get(urls.related.logos, JSON.stringify(mockRelatedLogos));

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

    // Espera que se renderice el loading spinner
    expect(await screen.getByTestId('spinner-backdrop')).toBeInTheDocument();
    const videosList = await screen.findAllByTestId(/video-item/i);
    expect(videosList[0]).toBeInTheDocument();

    userEvent.click(videosList[0]);

    const detailsTitle = await screen.findByTestId(/details-title/i);
    expect(detailsTitle).toBeInTheDocument();

    fetchMock.restore();

    // const videoItems = await screen.findAllByTestId(/video-item/i);
    // expect(videoItems.length).toBe(10);

    // const { videoDescription } = mockListResult.data[0];
    // console.log(videoDescription);
    // expect(await screen.findByText(videoDescription)).toBeInTheDocument();

    // screen.debug();
  });
});
