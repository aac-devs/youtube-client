import { useCallback, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Details from '../components/Details';
import VideosList from '../components/videos/VideosList';
import useHttp from '../hooks/useHttp';
import { findVideos, findVideo } from '../lib/youtube-api';
import { Container } from './DetailsView.styles';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import AuthContext from '../context/auth-context';

const DetailsView = () => {
  const { user, favorites, addToFavorites, removeFromFavorites } =
    useContext(AuthContext);
  const {
    sendRequest: sendSingleRequest,
    data: video,
    error: singleError,
  } = useHttp(findVideo);

  const {
    sendRequest: sendRelatedRequest,
    loading,
    data: videos,
    error: relatedError,
  } = useHttp(findVideos);

  const history = useHistory();
  const { videoId } = useParams();

  useEffect(() => {
    sendSingleRequest(videoId);
  }, [sendSingleRequest, videoId]);

  useEffect(() => {
    sendRelatedRequest({ relatedToVideoId: videoId, maxResults: 20 });
  }, [sendRelatedRequest, videoId]);

  const videoSelectedHandler = useCallback(
    (id) => {
      history.push(`/videos/${id}`);
    },
    [history]
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (singleError || relatedError) {
    // TODO: Contruir la card para el mensaje de error
    return <h1 data-testid="error-message">{singleError || relatedError}</h1>;
  }

  if (!video) {
    return null;
  }

  console.log({ video });

  return (
    <Container>
      <Details
        {...video}
        userLogged={user}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        favorites={favorites}
      />
      <div className="relates-area">
        <VideosList list={videos} onSelected={videoSelectedHandler} display="related" />
      </div>
    </Container>
  );
};

export default DetailsView;

// const [singleLoad, setSingleLoad] = useState(false);

// const [videoId, setVideoId] = useState(null);
// const history = useHistory();
// const { pathname } = history.location;

// console.log('<DetailsView />');

// useEffect(() => {
//   console.log('pathname', pathname);
//   const array = pathname.split('/');
//   setVideoId(array[array.length - 1]);
// }, [pathname]);

// useEffect(() => {
//   if (video) {
//     setSingleLoad(true);
//   }
// }, [video]);

// // carga el video para los detalles
// useEffect(() => {
//   console.log('arranca single');
//   sendSingleRequest(videoId);
// }, [sendSingleRequest, videoId]);

// // carga todos los videos
// useEffect(() => {
//   if (singleLoad) {
//     console.log('arranca list');
//     sendRelatedRequest({ relatedToVideoId: videoId, maxResults: 20 });
//     setSingleLoad(false);
//   }
// }, [sendRelatedRequest, videoId, singleLoad]);

// // captura el evento del video seleccionado
// const videoSelectedHandler = useCallback(
//   (id) => {
//     console.log('video selected handler');
//     // setSingleLoad(false);
//     setVideoId(id);
//     history.push(`/videos/${id}`);
//   },
//   [history]
// );

// if (loading) {
//   return <LoadingSpinner />;
// }

// if (singleError || relatedError) {
//   // TODO: Contruir la card para el mensaje de error
//   return <h1 data-testid="error-message">{singleError || relatedError}</h1>;
// }

// if (!video) {
//   return null;
// }

// console.log('video final');
// console.log(video);
