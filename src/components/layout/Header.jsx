import SearchBox from './SearchBox';

const Header = () => {
  return (
    <header role="heading" aria-level="2">
      <div className="search-section">
        <button type="button">menu</button>
        <SearchBox />
      </div>
      <div className="login-section">
        <p>Dark mode</p>
        <button type="button">login</button>
      </div>
    </header>
  );
};

export default Header;
