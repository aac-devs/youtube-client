import { useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import AppBar from './components/app-bar/AppBar';
import AppContext from './context/app-context';
import GlobalStyles from './global-styles';
import DetailsView from './pages/DetailsView';
import HomeView from './pages/HomeView';
import { darkTheme, lightTheme } from './styles/themes';
import { types } from './types/types';

// import { useEffect, useState } from 'react';
// import { findVideos } from './lib/enhanced-api';

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { page, changePage, appTheme } = useContext(AppContext);

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
  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   const pedir = async () => {
  //     const videos = await findVideos({ relatedBy: 'lWQ69WX7-hA', maxResults: '10' });
  //     setList(videos);
  //   };
  //   pedir();
  // }, []);

  return (
    // <pre>
    //   <code>{JSON.stringify(list)}</code>
    // </pre>
    <ThemeProvider theme={appTheme === types.theme.light ? lightTheme : darkTheme}>
      <GlobalStyles />
      <AppBar />
      {screen}
    </ThemeProvider>
  );
};

export default App;
