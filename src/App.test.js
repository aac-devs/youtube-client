import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server, rest } from './testServer';
import App from './App';
import { SearchContextProvider } from './context/search-context';
import mockReactData from './helper/mock-react.json';
import mockData from './helper/mock-data.json';

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
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    );
  });

  test('should render mock-data', async () => {
    await waitForSpinnerRenders();
    const videosListItems = await screen.findAllByTestId(/video-item/i);
    expect(videosListItems.length).toBe(24);
  });

  test('should render a new list of videos when search value changes', async () => {
    server.use(
      rest.get(`${baseUrl}/search`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockReactData));
      })
    );
    const currentVideos = await screen.findAllByTestId(/video-item/i);
    expect(currentVideos.length).toBe(24);

    const input = screen.getByPlaceholderText('search');
    userEvent.type(input, 'javascript{enter}');

    await waitForSpinnerRenders();

    const newVideos = await screen.findAllByTestId(/video-item/i);
    const { title } = mockReactData.items[0].snippet;
    expect(newVideos[0]).toHaveTextContent(title);
    expect(newVideos.length).toBe(20);
  });

  test('should render details view when a video is clicked', async () => {
    const currentVideos = await screen.findAllByTestId(/video-item/i);
    expect(currentVideos.length).toBe(24);

    const selectedVideo = currentVideos[0];
    userEvent.click(selectedVideo);

    await waitForSpinnerRenders();

    const { title } = mockData.items[0].snippet;
    const titleElement = screen.getByTestId('title');
    expect(titleElement).toHaveTextContent(title);
  });

  test('should return to home view when back button of details view is clicked', async () => {
    const currentVideos = await screen.findAllByTestId(/video-item/i);

    const selectedVideo = currentVideos[0];
    userEvent.click(selectedVideo);

    await waitForSpinnerRenders();

    const backButton = await screen.findByRole('button', { name: 'back to home' });
    userEvent.click(backButton);

    await waitForSpinnerRenders();

    expect(
      screen.queryByRole('button', { name: 'back to home' })
    ).not.toBeInTheDocument();
  });

  test('should return to home view when when search value changes', async () => {
    const currentVideos = await screen.findAllByTestId(/video-item/i);

    const selectedVideo = currentVideos[0];
    userEvent.click(selectedVideo);

    await waitForSpinnerRenders();

    expect(screen.getByTitle(/youtube video player/i)).toBeInTheDocument();

    const input = screen.getByPlaceholderText('search');
    userEvent.type(input, 'javascript{enter}');

    await waitForSpinnerRenders();

    expect(screen.queryByTitle(/youtube video player/i)).not.toBeInTheDocument();
  });
});
