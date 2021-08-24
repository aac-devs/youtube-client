import { ThemeProvider } from 'styled-components';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server, rest } from '../testServer';
import DetailsView from './DetailsView';
import mockRelatedResult from '../helper/mock/relatedToId/result.json';
import { darkTheme as lightTheme } from '../styles/themes';

const baseUrl = process.env.REACT_APP_BASE_URL;

describe('<DetailsView />', () => {
  const video = {
    videoId: 5,
    videoTitle: 'My Video',
    videoDescription: 'Description',
    videoDuration: 'PT18M11S',
    videoPublishedAt: '2019-06-10T23:00:02Z',
  };

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
        <ThemeProvider theme={lightTheme}>
          <DetailsView selectedVideo={video} />
        </ThemeProvider>
      );
    });

    test('should render Loading Spinner for a while', async () => {
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
      await waitForSpinnerRenders();
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    test('should render an iframe', async () => {
      await waitForSpinnerRenders();
      expect(screen.getByTitle(/youtube video player/i)).toBeInTheDocument();
    });

    test('should render a title', async () => {
      await waitForSpinnerRenders();
      expect(screen.getByText(video.videoTitle)).toBeInTheDocument();
    });

    test('should render a description', async () => {
      await waitForSpinnerRenders();
      expect(screen.getByText(video.videoDescription)).toBeInTheDocument();
    });

    test('should render a list of videos', async () => {
      await waitForSpinnerRenders();
      const videosListItems = await screen.findAllByTestId(/video-item/i);
      expect(videosListItems.length).toBe(9);
    });

    test('should render a new video after selected from related list videos', async () => {
      await waitForSpinnerRenders();
      const videosListItems = await screen.findAllByTestId(/video-item/i);
      userEvent.click(videosListItems[0]);

      await waitForSpinnerRenders();
      const { videoTitle } = mockRelatedResult.data[0];
      const titleElement = screen.getByTestId('title');
      expect(titleElement).toHaveTextContent(videoTitle);
    });
  });

  describe('error', () => {
    test('should show an error message when an error requests occurs', async () => {
      server.use(
        rest.get(`${baseUrl}/search`, (req, res, ctx) => {
          return res(ctx.status(404));
        })
      );
      render(
        <ThemeProvider theme={lightTheme}>
          <DetailsView selectedVideo={video} />
        </ThemeProvider>
      );
      await waitForSpinnerRenders();
      const errorMsg = await screen.findByTestId('error-message');
      expect(errorMsg).toBeInTheDocument();
    });
  });
});
