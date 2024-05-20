import { useState }from 'react'
import Header from "./Header"
import { fetchAllMovies, fetchGenres } from '../apiServices'
import Card from './Card'

import '../styles/Movies.css'

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [loaded, setLoaded] = useState(false);
  // const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState({});
  const [disabled, setDisabled] = useState(true);

  const fetchMovies = async (numPage) => {

    if(loaded) {
      setMovies([]);
    }

    try {
      const data = await fetchAllMovies(numPage);
      const dataGenres = await fetchGenres();
      const genresMap = dataGenres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
      }, {});
      setGenres(genresMap);
      setMovies(prevMovies => [...prevMovies, ...data.results]);
      setLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (!loaded) {
    fetchMovies();
  }

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
    setLoaded(true);
    const numPage = page + 1
    fetchMovies(numPage);
    setDisabled(false);
  };

  const handleBackClick = () => {
    setPage(prevPage => prevPage - 1);
    setLoaded(true);
    const numPage = page - 1
    fetchMovies(numPage);
    const disabled = numPage <= 1;
    setDisabled(disabled);
  };

  return (
    <div>
      <Header />
      <div className='card-container'>
        { movies.map((movie) => (
          <Card movie={movie} key={movie.id} genres={genres}/>
        ))}
      </div>
      <div className='pagination'>
        <button onClick={handleBackClick} disabled={disabled}>
          <i className="material-icons" style={{ fontSize: '18px', color: 'black'}}>arrow_back_ios</i>
        </button>
        <h3>{page}</h3>
        <button onClick={handleLoadMoreClick}>
          <i className="material-icons" style={{ fontSize: '18px', color: 'black'}}>arrow_forward_ios</i>
        </button>
      </div>
    </div>
  )
}

export default Movies