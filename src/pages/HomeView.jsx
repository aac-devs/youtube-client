import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import VideosList from '../components/videos/VideosList';
import { useAppContext } from '../context/app-context';
import { findVideos } from '../lib/youtube-api';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import useHttp from '../hooks/useHttp';
import ErrorCard from '../components/ErrorCard';
import { PageContainer } from '../global-styles';

const HomeView = () => {
  const { sendRequest, loading, data: videos, error, onResetError } = useHttp(findVideos);

  const history = useHistory();
  const { searchValue } = useAppContext();

  useEffect(() => {
    sendRequest({ q: searchValue, maxResults: 20 });
  }, [sendRequest, searchValue]);

  const videoSelectedHandler = useCallback(
    (videoId) => {
      history.push(`/videos/${videoId}`);
    },
    [history]
  );

  if (error) {
    return (
      <ErrorCard data-testid="error-message" onClose={() => onResetError()} {...error} />
    );
  }

  return (
    <PageContainer>
      {loading && <LoadingSpinner />}
      <VideosList list={videos} onSelected={videoSelectedHandler} display="home" />
    </PageContainer>
  );
};

export default HomeView;
