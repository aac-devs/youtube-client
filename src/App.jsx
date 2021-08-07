import { useState } from 'react';
import AppBar from './components/app-bar/AppBar';
import DetailsView from './pages/DetailsView';
import HomeView from './pages/HomeView';

const App = () => {
  const [searchValue, setSearchValue] = useState('react');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [page, setPage] = useState('home');

  const searchHandler = (value) => {
    if (page !== 'home') {
      setPage('home');
    }
    setSearchValue(value);
  };

  const selectedVideoHandler = (value) => {
    setSelectedVideo(value);
    setPage('details');
  };

  return (
    <>
      <AppBar onSearch={searchHandler} />
      {page === 'home' && (
        <HomeView searchValue={searchValue} onSelected={selectedVideoHandler} />
      )}
      {page === 'details' && (
        <DetailsView onBackToHome={() => setPage('home')} selectedVideo={selectedVideo} />
      )}
    </>
  );
};

export default App;
