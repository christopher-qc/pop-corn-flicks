import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <div className="logo-content">
            <img src="../public/movie-icon.svg" alt="Movie Icon"/>
            <h1>PopcornFlicks</h1>
          </div>
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/movies">Movies</Link>
      </div>
    </header>
  );
};

export default Header;
