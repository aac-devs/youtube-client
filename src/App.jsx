import { useState } from 'react';
import PageContent from './components/layout/PageContent';
import Layout from './components/layout/Layout';

const App = () => {
  const [searchValue, setSearchValue] = useState('react');

  const searchHandler = (value) => {
    setSearchValue(value);
  };

  return (
    <Layout onSearch={searchHandler}>
      <PageContent searchValue={searchValue} />
    </Layout>
  );
};

export default App;
