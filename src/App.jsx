import { useState } from 'react';
import Content from './components/layout/Content';
import Layout from './components/layout/Layout';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const searchHandler = (value) => {
    console.log('searchHandler en App');
    console.log(value);
    setSearchValue(value);
  };

  return (
    <Layout onSearch={searchHandler}>
      <Content searchValue={searchValue} />
    </Layout>
  );
};

export default App;
