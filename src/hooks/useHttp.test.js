import { act, renderHook } from '@testing-library/react-hooks';
import { fetchRelatedVideos, fetchVideos } from '../lib/api';
import useHttp from './useHttp';
import mockData from '../helper/mock-data.json';
import { server, rest } from '../testServer';

const baseUrl = process.env.REACT_APP_BASE_URL;

describe('useHttp Hook', () => {
  test('handles loading state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHttp(fetchVideos));
    act(() => {
      result.current.sendRequest('react');
    });
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
  });

  test('get data succesfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHttp(fetchVideos));
    act(() => {
      result.current.sendRequest('react');
    });
    await waitForNextUpdate();
    expect(result.current.data[0]).toEqual(mockData.items[0]);
  });

  test('handles error state correctly', async () => {
    server.use(
      rest.get(`${baseUrl}/search`, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    const { result, waitForNextUpdate } = renderHook(() => useHttp(fetchRelatedVideos));
    act(() => {
      result.current.sendRequest(25);
    });
    await waitForNextUpdate();
    expect(result.current.error).not.toBe(null);
  });
});
