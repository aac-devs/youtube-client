import { useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import AppBar from './components/app-bar/AppBar';
import AppContext from './context/app-context';
import GlobalStyles from './global-styles';
import DetailsView from './pages/DetailsView';
import HomeView from './pages/HomeView';
import { darkTheme, lightTheme } from './styles/themes';
import { types } from './types/types';

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { page, changePage, appTheme } = useContext(AppContext);

  const selectedVideoHandler = (value) => {
    setSelectedVideo(value);
    changePage(types.page.details);
  };

  let screen;
  if (page === types.page.home) {
    screen = <HomeView onSelected={selectedVideoHandler} />;
  } else {
    screen = <DetailsView selectedVideo={selectedVideo} />;
  }

  return (
    <ThemeProvider theme={appTheme === types.theme.light ? lightTheme : darkTheme}>
      <GlobalStyles />
      <AppBar />
      {screen}
    </ThemeProvider>
  );
};

export default App;
