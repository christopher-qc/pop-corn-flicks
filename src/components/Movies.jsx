import { useEffect, useState }from 'react'
import Header from "./Header"
import Card from './Card'
import { useNavigate } from 'react-router-dom';
import { HStack, Spinner } from "@chakra-ui/react"

import useStore from '@/store/useStore';

import '../styles/Movies.css'

const Movies = () => {
  const [page, ] = useState(1);
  
  const [disabled, ] = useState(true);

  const { movies, genres, loading, error, fetchMovies, fetchGenres } = useStore();  

  const handleLoadMoreClick = () => {
    console.log('2')
  };

  const handleBackClick = () => {
    console.log('2')
  };

  const navigate = useNavigate();
  const handleNavigate = (data) => {
    const states = { data, genres };
    navigate('/detail', { state: states });
  };

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  return (
    <div>
      <Header />
      { loading && (
        <HStack gap="5">
          <Spinner size="xl" />
        </HStack>
      )}
      {error && <p>{error}</p>}
      <div className='card-container' >
        { movies.map((movie) => (
          <Card movie={movie} key={movie.id} genres={genres} detailMovie={handleNavigate}/>
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