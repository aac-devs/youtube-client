import { renderHook } from '@testing-library/react-hooks';
import { fetchVideos } from '../lib/api';
import useHttp from './useHttp';
import mockData from '../helper/mock-data.json';
import { server, rest } from '../testServer';

const baseUrl = process.env.REACT_APP_BASE_URL;

describe('useHttp Hook', () => {
  test('handles loading state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHttp(fetchVideos, 'react'));
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
  });

  test('get data succesfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHttp(fetchVideos, 'react'));
    await waitForNextUpdate();
    expect(result.current.list[0]).toEqual(mockData.items[0]);
  });

  test('handles error state correctly', async () => {
    server.use(
      rest.get(`${baseUrl}/search`, (req, res, ctx) => {
        // console.log('server error');
        return res(ctx.status(404));
      })
    );
    const { result, waitForNextUpdate } = renderHook(() =>
      useHttp(fetchVideos, 'id-video', 'related')
    );
    await waitForNextUpdate();
    expect(result.current.error).not.toBe(null);
  });
});
