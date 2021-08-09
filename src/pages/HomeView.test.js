import { render, screen, waitFor } from '@testing-library/react';
import HomeView from './HomeView';
import { server, rest } from '../testServer';

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
      render(<HomeView />);
    });
    test('should render a loading spinner followed by multiple video items', async () => {
      await waitForSpinnerRenders();
      const videosList = await screen.findByTestId('list-videos');
      expect(videosList).toBeInTheDocument();
    });

    test('should render a loading spinner folloed by multiple video items', async () => {
      await waitForSpinnerRenders();
      const videosListItems = await screen.findAllByTestId(/video-item/i);
      expect(videosListItems.length).toBe(24);
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
