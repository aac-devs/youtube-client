import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock-jest';
import { LocalStorageMock } from '@react-mock/localstorage';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import App from './App';

import { AppContextProvider } from './context/app-context';
import { AuthContextProvider } from './context/auth-context';
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
import { list, single, related } from './mock/urls.json';

const history = createMemoryHistory();
const localUser = null;
fetchMock.config.fallbackToNetwork = true;

describe('<App /> Integration test: Authentication with Firebase (emulators):', () => {
  test('should register a new user, if it is already registered it should shown an error, otherwise it should registers it successfully', async () => {
    fetchMock
      .get(list.initial, JSON.stringify(mockListInitial))
      .get(list.durations, JSON.stringify(mockListDurations))
      .get(list.logos, JSON.stringify(mockListLogos));

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

    // Wait for loading spinner renders:
    expect(await screen.getByTestId('spinner-backdrop')).toBeInTheDocument();

    // Wait for <HomeView /> videos list renders:
    expect((await screen.findAllByTestId(/video-item/i)).length).toBe(10);
    fetchMock.restore();

    // Verify that the user is not logged in:
    expect(screen.getByTestId('login-btn')).toBeInTheDocument();

    // Open login modal:
    expect(screen.getByTestId(/login-btn/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(/login-btn/i));
    expect(await screen.findByTestId('signin-btn')).toBeInTheDocument();

    // Switch to the register form:
    userEvent.click(screen.getByText(/create a new account/i));
    expect(screen.getByText(/user register/i)).toBeInTheDocument();

    // Load the new user data, submit the form:
    userEvent.type(screen.getByPlaceholderText(/enter your email../i), 'aac@mail.com');
    userEvent.type(screen.getByPlaceholderText(/enter your password../i), '123456');
    userEvent.type(
      screen.getByPlaceholderText(/confirm your password../i),
      '123456{enter}'
    );

    // Wait for register form disappear:
    await waitForElementToBeRemoved(screen.getByText(/user register/i));

    // Show a modal with registration error or load the image in the login button:
    if (screen.queryByText(/authentication error/i)) {
      // Error, the user already exist!:
      expect(screen.getByTestId(/login-btn/i)).toBeInTheDocument();
      expect(screen.getByText(/the email address is already in/i)).toBeInTheDocument();
    } else {
      // New user is created, and logged in:
      expect(screen.getByTestId(/login-btn-/i)).toBeInTheDocument();
      expect(await screen.findAllByTestId(/fav-add-button-/i)).toBeInTheDocument();
    }
  });

  test('should log in a user and read favorites from Firebase', async () => {
    fetchMock
      .get(list.initial, JSON.stringify(mockListInitial))
      .get(list.durations, JSON.stringify(mockListDurations))
      .get(list.logos, JSON.stringify(mockListLogos));

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

    // Wait for loading spinner renders:
    expect(await screen.getByTestId('spinner-backdrop')).toBeInTheDocument();
    const videosList = await screen.findAllByTestId(/video-item/i);
    expect(videosList[0]).toBeInTheDocument();
    fetchMock.restore();

    // Wait for <HomeView /> videos list renders:
    expect(screen.getByTestId('login-btn')).toBeInTheDocument();

    // Open login modal:
    expect(screen.getByTestId(/login-btn/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(/login-btn/i));
    expect(await screen.findByTestId('signin-btn')).toBeInTheDocument();

    // Load the user data, submit the form:
    userEvent.type(screen.getByPlaceholderText(/enter your email../i), 'aac@mail.com');
    userEvent.type(
      screen.getByPlaceholderText(/enter your password../i),
      '123456{enter}'
    );

    // Wait for login form disappear:
    await waitForElementToBeRemoved(screen.getByText(/user login/i));

    // Show a modal with registration error or load the image in the login button:
    if (screen.queryByText(/authentication error/i)) {
      // Error, the user does not exist!:
      expect(screen.getByTestId(/login-btn/i)).toBeInTheDocument();
      expect(
        screen.getByText(/there is no user record corresponding to this/i)
      ).toBeInTheDocument();
    } else {
      // User logged in successfully:
      expect(screen.getByTestId(/login-btn-/i)).toBeInTheDocument();
    }

    // Get favorite buttons that correspond to videos that can be removed from favorites:
    const favVideosAdded = await screen.findAllByTestId(/fav-remove-button/i);
    expect(favVideosAdded[0]).toBeInTheDocument();

    // Get favorite buttons that correspond to videos that can be added to favorites:
    const videosFavButton = await screen.findAllByTestId(/fav-add-button-/i);
    expect(videosFavButton[0]).toBeInTheDocument();

    // Expect there are 3 favorites
    expect(favVideosAdded.length).toBe(3);
    expect(videosFavButton.length).toBe(7);

    // These events must be executed the first time the tests are run so that loading the three favorites in the database emulator, obviously, this first test will fail:
    // userEvent.click(videosFavButton[0]);
    // userEvent.click(videosFavButton[1]);
    // userEvent.click(videosFavButton[2]);

    // Confirm that we are on the /videos route, <HomeView />:
    expect(history.location.pathname).toBe('/videos');

    // Clicks the menu favorites item:
    userEvent.click(screen.getByTestId(/login-btn/i));
    userEvent.click(screen.getByTestId(/menu-fav-right-btn/i));

    // Confirm that we are on the /favorites route, <FavoritesView />:
    expect(history.location.pathname).toBe('/favorites');

    // Expect renders a favorites list with 3 items:
    const favs = await screen.findAllByTestId(/video-item-favorites/i);
    expect(favs[0]).toBeInTheDocument();
    expect(favs.length).toBe(3);

    // Clicks a favorite item:
    userEvent.click(favs[0]);

    // Confirm that we are on the /favorites/videoId route, <FavoritesDetailsView />:
    expect(history.location.pathname).toBe(
      `/favorites/${mockListResult.data[0].videoId}`
    );
  });
});

describe('<App /> Integration test: Add and remove a favorite from Firebase', () => {
  beforeEach(async () => {
    fetchMock.restore();
    fetchMock
      .get(list.initial, JSON.stringify(mockListInitial))
      .get(list.durations, JSON.stringify(mockListDurations))
      .get(list.logos, JSON.stringify(mockListLogos));

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

    // Wait for loading spinner renders:
    expect(await screen.getByTestId('spinner-backdrop')).toBeInTheDocument();

    // Wait for <HomeView /> videos list renders:
    expect((await screen.findAllByTestId(/video-item/i)).length).toBe(10);
    fetchMock.restore();

    // Verify that the user is not logged in:
    expect(screen.getByTestId('login-btn')).toBeInTheDocument();

    // Open login modal:
    expect(screen.getByTestId(/login-btn/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(/login-btn/i));
    expect(await screen.findByTestId('signin-btn')).toBeInTheDocument();

    // Load the user data, submit the form:
    userEvent.type(
      screen.getByPlaceholderText(/enter your email../i),
      'userfavs@mail.com'
    );
    userEvent.type(
      screen.getByPlaceholderText(/enter your password../i),
      '123456{enter}'
    );

    // Wait for login form disappear:
    await waitForElementToBeRemoved(screen.getByText(/user login/i));

    // Show a modal with registration error or load the image in the login button:
    if (screen.queryByText(/authentication error/i)) {
      // Error, the user does not exist!:
      expect(screen.getByTestId(/login-btn/i)).toBeInTheDocument();
      expect(
        screen.getByText(/there is no user record corresponding to this/i)
      ).toBeInTheDocument();
    } else {
      // User logged in successfully:
      expect(screen.getByTestId(/login-btn-/i)).toBeInTheDocument();
    }
  });

  test('should add one favorite', async () => {
    // Get favorite buttons that correspond to videos that can be added to favorites:
    const videosFavButton = await screen.findAllByTestId(/fav-add-button-/i);
    expect(videosFavButton.length).toBe(10);

    // Clicks one favorite to be added:
    userEvent.click(videosFavButton[0]);

    // Get the added favorite id to construct a regular expression which be used to detect the added favorite:
    const value = videosFavButton[0].getAttribute('data-testid').split('-')[3];
    const reg = new RegExp(`fav-remove-button-${value}`);

    // Get favorite buttons that correspond to videos that can be removed from favorites:
    const noFavs = await screen.findAllByTestId(reg);

    // Expect only one favorite has been added :
    expect(noFavs.length).toBe(1);
  });

  test('should remove one favorite', async () => {
    // Get favorite buttons that correspond to videos that can be removed from favorites:
    const videosFavButton = await screen.findAllByTestId(/fav-remove-button-/i);

    // Clicks one favorite to be removed:
    expect(videosFavButton.length).toBe(1);

    // Get the removed favorite id to construct a regular expression which be used to detect the removed favorite:
    userEvent.click(videosFavButton[0]);

    const value = videosFavButton[0].getAttribute('data-testid').split('-')[3];
    const reg = new RegExp(`fav-add-button-${value}`);

    // Get favorite buttons that correspond to videos that can be added to favorites:
    const noFavs = await screen.findAllByTestId(reg);

    // Expect only one favorite has been removed :
    expect(noFavs.length).toBe(1);
  });
});

describe('<App /> Integration test: transition from <HomeView /> to <DetailsView />', () => {
  it('should renders <DetailsView /> page with its information when clicks a video item from <HomeView />', async () => {
    fetchMock.restore();
    fetchMock
      .get(list.initial, JSON.stringify(mockListInitial))
      .get(list.durations, JSON.stringify(mockListDurations))
      .get(list.logos, JSON.stringify(mockListLogos))

      .get(single.initial, JSON.stringify(mockSingleInitial))
      .get(single.durations, JSON.stringify(mockSingleDurations))
      .get(single.logos, JSON.stringify(mockSingleLogos))

      .get(related.initial, JSON.stringify(mockRelatedInitial))
      .get(related.durations, JSON.stringify(mockRelatedDurations))
      .get(related.logos, JSON.stringify(mockRelatedLogos));

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

    // Wait for loading spinner renders:
    expect(await screen.getByTestId('spinner-backdrop')).toBeInTheDocument();

    // Wait for <HomeView /> videos list renders:
    const videosList = await screen.findAllByTestId(/video-item-home-/i);
    expect(videosList[0]).toBeInTheDocument();

    // Confirm that we are on the /videos route, <HomeView />:
    expect(history.location.pathname).toBe('/videos');

    // Clicks one video item:
    userEvent.click(videosList[0]);

    // Confirm that we are on the /videos/videoId route, <DetailsView />:
    expect(history.location.pathname).toBe(`/videos/${mockListResult.data[0].videoId}`);

    // Wait for <DetailsView /> videos title renders:
    const detailsTitle = await screen.findByTestId(/details-title/i);
    expect(detailsTitle).toBeInTheDocument();

    // Wait for <DetailsView /> related videos renders:
    const videoItems = await screen.findAllByTestId(/video-item-related/i);
    expect(videoItems.length).toBe(9);

    const mockDescription = mockListResult.data[0].videoDescription;

    // Expect video description to be in the document:
    const videoDescription = await screen.findByText(new RegExp(`${mockDescription}`));
    expect(videoDescription).toBeInTheDocument();

    // Expect video frame to be in the document:
    expect(screen.getByTitle('YouTube video player')).toBeInTheDocument();
  });
});
