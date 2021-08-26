import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';
import HomeView from './HomeView';
import { AppContextProvider } from '../context/app-context';
import { darkTheme } from '../styles/themes';
import mockListInitial from '../mock/list/initial.json';
import mockListDurations from '../mock/list/durations.json';
import mockListLogos from '../mock/list/logos.json';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

describe('<HomeView />', () => {
  const history = createMemoryHistory();

  describe('success', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
      fetchMock.mockResponses(
        [JSON.stringify(mockListInitial), { status: 200 }],
        [JSON.stringify(mockListDurations), { status: 200 }],
        [JSON.stringify(mockListLogos), { status: 200 }]
      );

      render(
        <AppContextProvider>
          <ThemeProvider theme={darkTheme}>
            <Router history={history}>
              <HomeView />
            </Router>
          </ThemeProvider>
        </AppContextProvider>
      );
    });

    test('should render a loading spinner folloed by multiple video items', async () => {
      const spinner = await screen.getByTestId('spinner-backdrop');
      expect(spinner).toBeInTheDocument();
      const videosListItems = await screen.findAllByTestId(/video-item/i);
      expect(videosListItems.length).toBe(10);
    });

    test('should launch video details view when clicked', async () => {
      const spinner = await screen.getByTestId('spinner-backdrop');
      expect(spinner).toBeInTheDocument();
      const videoItem = await screen.findByTestId('video-item-lWQ69WX7-hA');
      userEvent.click(videoItem);
      expect(history.location.pathname).toBe('/videos/lWQ69WX7-hA');
    });
  });

  describe('error', () => {
    test('should show an error message when an error requests occurs', async () => {
      fetchMock.mockReject(new Error('fake error message'));
      render(
        <AppContextProvider>
          <ThemeProvider theme={darkTheme}>
            <Router history={history}>
              <HomeView />
            </Router>
          </ThemeProvider>
        </AppContextProvider>
      );
      const errorMsg = await screen.findByTestId('error-message');
      expect(errorMsg).toBeInTheDocument();
    });
  });
});
