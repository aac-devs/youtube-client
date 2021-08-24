import { ThemeProvider } from 'styled-components';
import { render, screen, waitFor } from '@testing-library/react';
import HomeView from './HomeView';
import { server, rest } from '../testServer';
import { AppContextProvider } from '../context/app-context';
import { darkTheme } from '../styles/themes';

const baseUrl = process.env.REACT_APP_BASE_URL;

describe('<HomeView />', () => {
  const waitForSpinnerRenders = async () => {
    const spinner = await screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    await waitFor(() => {
      expect(spinner).not.toBeInTheDocument();
    });
  };

  describe('success', () => {
    beforeEach(() => {
      render(
        <AppContextProvider>
          <ThemeProvider theme={darkTheme}>
            <HomeView />
          </ThemeProvider>
        </AppContextProvider>
      );
    });

    test('should render a loading spinner followed by multiple video items', async () => {
      await waitForSpinnerRenders();
      const videosList = await screen.findByTestId('list-videos');
      expect(videosList).toBeInTheDocument();
    });

    test('should render a loading spinner folloed by multiple video items', async () => {
      await waitForSpinnerRenders();
      const videosListItems = await screen.findAllByTestId(/video-item/i);
      expect(videosListItems.length).toBe(10);
    });
  });

  describe('error', () => {
    test('should show an error message when an error requests occurs', async () => {
      server.use(
        rest.get(`${baseUrl}/search`, (req, res, ctx) => {
          return res(ctx.status(404));
        })
      );
      render(<HomeView />);
      await waitForSpinnerRenders();
      const errorMsg = await screen.findByTestId('error-message');
      expect(errorMsg).toBeInTheDocument();
    });
  });
});
