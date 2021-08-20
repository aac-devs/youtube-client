import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server, rest } from './testServer';
import App from './App';
import { AppContextProvider } from './context/app-context';
import mockListInitial from './helper/mock/list/initial.json';
import mockListDurations from './helper/mock/list/durations.json';
import mockListLogos from './helper/mock/list/logos.json';
import mockListResult from './helper/mock/list/result.json';

const baseUrl = process.env.REACT_APP_BASE_URL;

describe('<App />', () => {
  const waitForSpinnerRenders = async () => {
    const spinner = await screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    await waitFor(() => {
      expect(spinner).not.toBeInTheDocument();
    });
  };

  beforeEach(() => {
    render(
      <AppContextProvider>
        <App />
      </AppContextProvider>
    );
  });

  test('should render mock-data', async () => {
    await waitForSpinnerRenders();
    const videosListItems = await screen.findAllByTestId(/video-item/i);
    expect(videosListItems.length).toBe(10);
  });

  test('should render details view when a video is clicked', async () => {
    await waitForSpinnerRenders();

    const currentVideos = await screen.findAllByTestId(/video-item/i);
    expect(currentVideos.length).toBe(10);

    const selectedVideo = currentVideos[0];
    userEvent.click(selectedVideo);

    await waitForSpinnerRenders();

    const { videoTitle } = mockListResult.data[0];
    const titleElement = screen.getByTestId('title');
    expect(titleElement).toHaveTextContent(videoTitle);
  });

  test('should render a new list of videos when search value changes', async () => {
    server.use(
      rest.get(`${baseUrl}/search`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockListInitial));
      }),
      rest.get(`${baseUrl}/videos`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockListDurations));
      }),
      rest.get(`${baseUrl}/channels`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockListLogos));
      })
    );
    await waitForSpinnerRenders();

    const currentVideos = await screen.findAllByTestId(/video-item/i);
    expect(currentVideos.length).toBe(10);

    const input = screen.getByPlaceholderText('search..');
    userEvent.type(input, 'javascript{enter}');

    await waitForSpinnerRenders();

    const newVideos = await screen.findAllByTestId(/video-item/i);
    const { videoTitle } = mockListResult.data[0];
    expect(newVideos[0]).toHaveTextContent(videoTitle);
    expect(newVideos.length).toBe(10);
  });

  test('should render details view when a video is clicked', async () => {
    await waitForSpinnerRenders();

    const currentVideos = await screen.findAllByTestId(/video-item/i);
    expect(currentVideos.length).toBe(10);

    const selectedVideo = currentVideos[0];
    userEvent.click(selectedVideo);

    await waitForSpinnerRenders();

    const { videoTitle } = mockListResult.data[0];
    const titleElement = screen.getByTestId('title');
    expect(titleElement).toHaveTextContent(videoTitle);
  });

  test('should render details view when a video is clicked', async () => {
    await waitForSpinnerRenders();

    const currentVideos = await screen.findAllByTestId(/video-item/i);
    expect(currentVideos.length).toBe(10);

    const selectedVideo = currentVideos[0];
    userEvent.click(selectedVideo);

    await waitForSpinnerRenders();

    const { videoTitle } = mockListResult.data[0];
    const titleElement = screen.getByTestId('title');
    expect(titleElement).toHaveTextContent(videoTitle);
  });

  test('should return to home view when brand button of AppBar is clicked', async () => {
    const currentVideos = await screen.findAllByTestId(/video-item/i);

    const selectedVideo = currentVideos[0];
    userEvent.click(selectedVideo);

    await waitForSpinnerRenders();

    expect(screen.getByTitle(/youtube video player/i)).toBeInTheDocument();

    const backButton = await screen.findByTestId('brand-btn');
    userEvent.click(backButton);

    await waitForSpinnerRenders();

    expect(screen.queryByTitle(/youtube video player/i)).not.toBeInTheDocument();
  });

  test('should return to home view when when search value changes', async () => {
    const currentVideos = await screen.findAllByTestId(/video-item/i);

    const selectedVideo = currentVideos[0];
    userEvent.click(selectedVideo);

    await waitForSpinnerRenders();

    expect(screen.getByTitle(/youtube video player/i)).toBeInTheDocument();

    const input = screen.getByPlaceholderText('search..');
    userEvent.type(input, 'javascript{enter}');

    await waitForSpinnerRenders();

    expect(screen.queryByTitle(/youtube video player/i)).not.toBeInTheDocument();
  });
});
