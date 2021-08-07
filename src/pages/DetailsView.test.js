import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server, rest } from '../testServer';
import DetailsView from './DetailsView';
import mockData from '../helper/mock-data.json';

const baseUrl = process.env.REACT_APP_BASE_URL;

describe('<DetailsView />', () => {
  const video = {
    id: 5,
    title: 'My Video',
    description: 'Description',
  };
  const backToHome = jest.fn();

  beforeEach(() => {});

  describe('asynchronous elements tests', () => {
    describe('error', () => {
      test('should show an error message when an error requests occurs', async () => {
        server.use(
          rest.get(`${baseUrl}/search`, (req, res, ctx) => {
            return res(ctx.status(404));
          })
        );
        render(<DetailsView selectedVideo={video} onBackToHome={backToHome} />);
        const errorMsg = await screen.findByTestId('error-message');
        expect(errorMsg).toBeInTheDocument();
      });
    });

    describe('success', () => {
      beforeEach(() => {
        render(<DetailsView selectedVideo={video} onBackToHome={backToHome} />);
      });
      test('should render Loading Spinner for a while', async () => {
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
        await waitFor(() => {
          expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        });
      });
      test('should render a list of videos', async () => {
        const videosListItems = await screen.findAllByTestId(/video-item/i);
        expect(videosListItems.length).toBe(24);
      });
      test('should render a new video after selected from related list videos', async () => {
        const videosListItems = await screen.findAllByTestId(/video-item/i);
        userEvent.click(videosListItems[0]);
        const { title } = mockData.items[0].snippet;
        const titleElement = screen.getByTestId('title');
        expect(titleElement).toHaveTextContent(title);
      });
    });
  });

  describe('synchronous element tests', () => {
    beforeEach(() => {
      render(<DetailsView selectedVideo={video} onBackToHome={backToHome} />);
    });

    test('should render an iframe', () => {
      expect(screen.getByTitle(/youtube video player/i)).toBeInTheDocument();
    });
    test('should render the title', () => {
      expect(screen.getByText(video.title)).toBeInTheDocument();
    });
    test('should render the description', () => {
      expect(screen.getByText(video.description)).toBeInTheDocument();
    });
  });
});