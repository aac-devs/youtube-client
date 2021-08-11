import { rest } from 'msw';
import { setupServer } from 'msw/node';

import mockRelatedInitial from './helper/mock/relatedToId/initial.json';
import mockRelatedDurations from './helper/mock/relatedToId/durations.json';

import mockListInitial from './helper/mock/list/initial.json';
import mockListDurations from './helper/mock/list/durations.json';
import mockListLogos from './helper/mock/list/logos.json';

const baseUrl = process.env.REACT_APP_BASE_URL;

let relatedToId = false;

const server = setupServer(
  rest.get(`${baseUrl}/search`, (req, res, ctx) => {
    const q = req.url.searchParams.get('q');
    let mockData;
    if (q) {
      mockData = mockListInitial;
    } else {
      relatedToId = true;
      mockData = mockRelatedInitial;
    }
    return res(ctx.status(200), ctx.json(mockData));
  }),

  rest.get(`${baseUrl}/videos`, (req, res, ctx) => {
    let mockData = mockListDurations;
    if (relatedToId) {
      mockData = mockRelatedDurations;
      relatedToId = false;
    }
    return res(ctx.status(200), ctx.json(mockData));
  }),

  rest.get(`${baseUrl}/channels`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockListLogos));
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
