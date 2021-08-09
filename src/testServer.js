import { rest } from 'msw';
import { setupServer } from 'msw/node';
import mockSearchVideos from './helper/mock-search-videos.json';
import mockSearchRelated from './helper/mock-search-related.json';
import mockSearchDurations from './helper/mock-videos-duration.json';
import mockSearchLogos from './helper/mock-channels-logos.json';

const baseUrl = process.env.REACT_APP_BASE_URL;

const server = setupServer(
  rest.get(`${baseUrl}/search`, (req, res, ctx) => {
    const searchItem = req.url.searchParams.get('q');
    const relatedId = req.url.searchParams.get('relatedToVideoId');
    // console.log('search item:', searchItem);
    // console.log('related id:', relatedId);
    let mockData;
    if (searchItem) {
      mockData = mockSearchVideos;
    }
    if (relatedId) {
      mockData = mockSearchRelated;
    }

    return res(ctx.status(200), ctx.json(mockData));
  }),

  rest.get(`${baseUrl}/videos`, (req, res, ctx) => {
    // console.log(mockVideos);
    const videoIds = req.url.searchParams.get('id');
    // console.log('videos/durations:', videoIds);
    let mockData;
    if (videoIds) {
      mockData = mockSearchDurations;
    }
    return res(ctx.status(200), ctx.json(mockData));
  }),

  rest.get(`${baseUrl}/channels`, (req, res, ctx) => {
    // console.log(mockVideos);
    const channelIds = req.url.searchParams.get('id');
    // console.log('videos/logos:', channelIds);
    let mockData;
    if (channelIds) {
      mockData = mockSearchLogos;
    }
    return res(ctx.status(200), ctx.json(mockData));
  }),

  rest.get('*', (req, res, ctx) => {
    console.error(`You have to write a request handler to ${req.url.toString()}`);
    return res(ctx.status(500), ctx.json({ error: 'Please write a request handler' }));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
