import { act, renderHook } from '@testing-library/react-hooks';
import { findVideos } from '../lib/enhanced-api';
import useHttp from './useHttp';
import { server, rest } from '../testServer';
import mockRelatedResult from '../helper/mock/relatedToId/result.json';
import mockListResult from '../helper/mock/list/result.json';

const baseUrl = process.env.REACT_APP_BASE_URL;

describe('useHttp Hook', () => {
  test('handles loading state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHttp(findVideos));
    act(() => {
      result.current.sendRequest({ q: 'react' });
    });
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
  });

  test('get related videos data succesfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHttp(findVideos));
    act(() => {
      result.current.sendRequest({ relatedToVideoId: 'rel' });
    });
    await waitForNextUpdate();
    expect(result.current.data).toEqual(mockRelatedResult.data);
  });

  test('get search list videos data succesfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHttp(findVideos));
    act(() => {
      result.current.sendRequest({ q: 'html' });
    });
    await waitForNextUpdate();
    expect(result.current.data).toEqual(mockListResult.data);
  });

  test('handles error state correctly', async () => {
    server.use(
      rest.get(`${baseUrl}/search`, (req, res) => {
        return res.networkError();
      })
    );
    const { result, waitForNextUpdate } = renderHook(() => useHttp(findVideos));
    act(() => {
      result.current.sendRequest({ relatedToVideoId: '25' });
    });
    await waitForNextUpdate();
    expect(result.current.error).not.toBe(null);
  });
});
