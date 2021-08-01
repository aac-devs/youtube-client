import { useState, useEffect } from 'react';
import styled from 'styled-components';
import DetailsView from '../../pages/DetailsView';
import HomeView from '../../pages/HomeView';

const Container = styled.main`
  margin: 0 auto;
  max-width: 1700px;
  width: 100%;
  padding-top: 64px;
`;

const PageContent = (props) => {
  const [dataVideoSelected, setDataVideoSelected] = useState(null);
  const { searchValue } = props;

  useEffect(() => {
    setDataVideoSelected(null);
  }, [searchValue]);

  const videoSelectedHandler = (videoData) => {
    setDataVideoSelected(videoData);
  };

  return (
    <Container>
      {!dataVideoSelected && (
        <HomeView searchValue={props.searchValue} onSelected={videoSelectedHandler} />
      )}
      {dataVideoSelected && (
        <DetailsView
          dataVideoSelected={dataVideoSelected}
          onBackToHome={() => setDataVideoSelected(null)}
        />
      )}
    </Container>
  );
};

export default PageContent;
