import { act, renderHook } from '@testing-library/react-hooks';
import { findRelatedVideos, findVideos } from '../lib/enhanced-api';
import useHttp from './useHttp';
import mockData from '../helper/mock-result-videos.json';
// import { server, rest } from '../testServer';

// const baseUrl = process.env.REACT_APP_BASE_URL;

describe('useHttp Hook', () => {
  test('handles loading state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHttp(findVideos));
    act(() => {
      result.current.sendRequest('react');
    });
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
  });

  test('get data succesfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHttp(findVideos));
    act(() => {
      result.current.sendRequest('rel');
    });
    await waitForNextUpdate();
    // console.log(result.current.data);
    expect(result.current.data.data[0]).toEqual(mockData.data[0]);
  });

  // TODO: crear el archivo resultante de videos relacionados

  // test('handles error state correctly', async () => {
  //   server.use(
  //     rest.get(`${baseUrl}/search`, (req, res) => {
  //       return res.networkError('Failed to connect');
  //     })
  //   );
  //   const { result, waitForNextUpdate } = renderHook(() => useHttp(findRelatedVideos));
  //   act(() => {
  //     result.current.sendRequest(25);
  //   });
  //   await waitForNextUpdate();
  //   expect(result.current.error).not.toBe(null);
  // });
});
