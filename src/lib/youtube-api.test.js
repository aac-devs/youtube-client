import mockListInitial from '../mock/list/initial.json';
import mockListDurations from '../mock/list/durations.json';
import mockListLogos from '../mock/list/logos.json';
import mockListResult from '../mock/list/result.json';
import mockRelatedInitial from '../mock/relatedToId/initial.json';
import mockRelatedDurations from '../mock/relatedToId/durations.json';
import mockRelatedLogos from '../mock/relatedToId/logos.json';
import mockRelatedResult from '../mock/relatedToId/result.json';
import mockSingleInitial from '../mock/single/initial.json';
import mockSingleDurations from '../mock/single/durations.json';
import mockSingleLogos from '../mock/single/logos.json';
import mockSingleResult from '../mock/single/result.json';
import { findVideo, findVideos } from '../lib/youtube-api';

describe('youtube-api.js', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('should return a list of mocked videos successfully', async () => {
    fetchMock.mockResponses(
      [JSON.stringify(mockListInitial), { status: 200 }],
      [JSON.stringify(mockListDurations), { status: 200 }],
      [JSON.stringify(mockListLogos), { status: 200 }]
    );
    const value = {
      route: 'search',
      part: 'snippet',
      q: 'react',
      maxResults: 10,
      type: 'video',
      safeSearch: 'strict',
    };
    const lista = await findVideos(value);
    expect(lista).toEqual(mockListResult);
  });

  test('should return a list of mocked related videos successfully', async () => {
    fetchMock.mockResponses(
      [JSON.stringify(mockRelatedInitial), { status: 200 }],
      [JSON.stringify(mockRelatedDurations), { status: 200 }],
      [JSON.stringify(mockRelatedLogos), { status: 200 }]
    );
    const value = {
      route: 'search',
      part: 'snippet',
      relatedToVideoId: 'lWQ69WX7-hA',
      maxResults: 10,
      type: 'video',
      safeSearch: 'strict',
    };
    const lista = await findVideos(value);
    expect(lista).toEqual(mockRelatedResult);
  });

  test('should return a mocked video successfully', async () => {
    fetchMock.mockResponses(
      [JSON.stringify(mockSingleInitial), { status: 200 }],
      [JSON.stringify(mockSingleDurations), { status: 200 }],
      [JSON.stringify(mockSingleLogos), { status: 200 }]
    );
    const value = 'lWQ69WX7-hA';
    const video = await findVideo(value);
    expect(video).toEqual(mockSingleResult);
  });

  test('should return a fake error when a search of videos is carried out', async () => {
    fetchMock.mockReject(new Error('fake error message'));
    const value = {
      route: 'search',
      part: 'snippet',
      q: 'react',
      maxResults: 10,
      type: 'video',
      safeSearch: 'strict',
    };
    const error = await findVideos(value);
    expect(error).toEqual({ ok: false, error: 'fake error message' });
  });

  test('should return a fake error when a search of a single video is carried out', async () => {
    fetchMock.mockReject(new Error('fake error message'));
    const value = 'lWQ69WX7-hA';
    const error = await findVideo(value);
    expect(error).toEqual({ ok: false, error: 'fake error message' });
  });

  test('should return a fake error when a search of videos is carried out and the Error message is not returned', async () => {
    fetchMock.mockReject(new Error());
    const value = {
      route: 'search',
      part: 'snippet',
      q: 'react',
      maxResults: 10,
      type: 'video',
      safeSearch: 'strict',
    };
    const error = await findVideos(value);
    expect(error).toEqual({ ok: false, error: 'Something went wrong' });
  });

  test('should return a fake error when a search of a single video is carried out and the Error message is not returned', async () => {
    fetchMock.mockReject(new Error());
    const value = 'lWQ69WX7-hA';
    const error = await findVideo(value);
    expect(error).toEqual({ ok: false, error: 'Something went wrong' });
  });
});
