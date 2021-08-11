import { useContext, useState } from 'react';
import AppBar from './components/app-bar/AppBar';
import AppContext from './context/app-context';
import DetailsView from './pages/DetailsView';
import HomeView from './pages/HomeView';

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { page, changePage } = useContext(AppContext);

  const selectedVideoHandler = (value) => {
    setSelectedVideo(value);
    changePage('details');
  };

  let screen;
  if (page === 'home') {
    screen = <HomeView onSelected={selectedVideoHandler} />;
  } else {
    screen = <DetailsView selectedVideo={selectedVideo} />;
  }

  return (
    <>
      <AppBar />
      {screen}
    </>
  );
};

export default App;
