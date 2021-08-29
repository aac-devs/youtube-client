import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DetailsView from './pages/DetailsView';
import HomeView from './pages/HomeView';
import Layout from './components/layout/Layout';
import AuthContext from './context/auth-context';
import FavoritesView from './pages/FavoritesView';
import FavoriteDetailsView from './pages/FavoriteDetailsView';

const App = () => {
  const { user } = useContext(AuthContext);
  // console.log({ user });
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
          <Switch>
            <Route path="/favorites" exact>
              <FavoritesView />
            </Route>
            <Route path="/favorites/:videoId">
              <FavoriteDetailsView />
            </Route>
          </Switch>
        )}
        <Route path="*">
          <Redirect to="/videos" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
