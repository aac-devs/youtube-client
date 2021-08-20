import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DetailsView from './pages/DetailsView';
import HomeView from './pages/HomeView';
import Layout from './components/layout/Layout';
import AuthContext from './context/auth-context';
import FavoritesView from './pages/FavoritesView';
import FavoriteDetailsView from './pages/FavoriteDetailsView';
import NotFound from './pages/NotFound';
// import LoadingSpinner from './components/UI/LoadingSpinner';
// import AppContext from './context/app-context';

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/videos" />
        </Route>
        <Route path="/videos" exact>
          <HomeView />
        </Route>
        <Route path="/videos/:videoId">
          <DetailsView />
        </Route>
        {user && (
          <>
            <Route path="/favorites" exact>
              <FavoritesView />
            </Route>
            <Route path="/favorites/:videoId">
              <FavoriteDetailsView />
            </Route>
          </>
        )}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
