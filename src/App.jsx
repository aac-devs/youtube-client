// import { useContext, useState } from 'react';
// import AppBar from './components/app-bar/AppBar';
// import AppContext from './context/app-context';
// import DetailsView from './pages/DetailsView';
// import HomeView from './pages/HomeView';

import { useEffect, useState } from 'react';
// import { useState } from 'react';
import { findVideos } from './lib/enhanced-api';

// import { findRelatedVideos } from './lib/enhanced-api';
// import findVideos from './lib/enhanced-api';

const App = () => {
  const [lista, setLista] = useState([]);

  // const [selectedVideo, setSelectedVideo] = useState(null);
  // const { page, changePage } = useContext(AppContext);

  // const selectedVideoHandler = (value) => {
  //   setSelectedVideo(value);
  //   changePage('details');
  // };

  // let screen;
  // if (page === 'home') {
  //   screen = <HomeView onSelected={selectedVideoHandler} />;
  // } else {
  //   screen = <DetailsView selectedVideo={selectedVideo} />;
  // }

  // findVideos('react');

  // console.log(videos);

  useEffect(() => {
    const prueba = async () => {
      const data = await findVideos('react');
      console.log(data);
      setLista(data);
    };
    prueba();
  }, []);

  // prueba();

  return (
    <>
      <pre>
        <code>{JSON.stringify(lista)}</code>
      </pre>
      {/* <h1>Videos</h1> */}
      {/* <AppBar />
      {screen} */}
    </>
  );
};

export default App;
