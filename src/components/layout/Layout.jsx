import Header from './Header';

const Layout = (props) => {
  return (
    <>
      <Header onSearch={props.onSearch} />
      {props.children}
    </>
  );
};

export default Layout;
