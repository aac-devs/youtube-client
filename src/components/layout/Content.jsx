import HomeView from '../../pages/HomeView';

const Content = (props) => {
  return (
    <main>
      <HomeView searchValue={props.searchValue} />
    </main>
  );
};

export default Content;
