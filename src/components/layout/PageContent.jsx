import { useState } from 'react';
import DetailsView from '../../pages/DetailsView';
import HomeView from '../../pages/HomeView';

const PageContent = (props) => {
  const [videoSelected, setVideoSelected] = useState(null);

  const videoSelectedHandler = (videoId) => {
    setVideoSelected(videoId);
  };

  return (
    <main>
      {!videoSelected && (
        <HomeView searchValue={props.searchValue} onSelected={videoSelectedHandler} />
      )}
      {videoSelected && (
        <DetailsView
          videoSelected={videoSelected}
          onBackToHome={() => setVideoSelected(null)}
        />
      )}
    </main>
  );
};

export default PageContent;
