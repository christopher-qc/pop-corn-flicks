import { useEffect, useState }from 'react'
import Header from "./Header"
import Card from './Card'
import { useNavigate } from 'react-router-dom';
import { HStack, Spinner, Icon } from "@chakra-ui/react"
import { HiChevronLeft, HiChevronRight  } from "react-icons/hi"


import useStore from '@/store/useStore';

import '../styles/Movies.css'

const Movies = () => {
  const [page, setPage] = useState(1);

  const { movies, genres, loading, error, fetchMovies, fetchGenres } = useStore();  

  const handleBackClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };

  const navigate = useNavigate();
  const handleNavigate = (data) => {
    const states = { data, genres };
    navigate('/detail', { state: states });
  };

  useEffect(() => {
    fetchMovies(page);
  }, [fetchMovies, page]);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  if (loading) {
    return (
      <HStack gap="5">
        <Spinner size="xl" />
      </HStack>
    )
  }

  if (error) {
    return (
      <p>{error}</p>
    )
  }

  return (
    <div>
      <Header />
      <div className='card-container' >
        { movies.map((movie) => (
          <Card movie={movie} key={movie.id} genres={genres} detailMovie={handleNavigate}/>
        ))}
      </div>
      <div className='pagination'>
        <button onClick={handleBackClick}>
          <Icon fontSize="2xl" color="#111111">
          <HiChevronLeft  />
        </Icon>
        </button>
        <h3>{page}</h3>
        <button onClick={handleLoadMoreClick}>
          <Icon fontSize="2xl" color="#111111">
          <HiChevronRight  />
        </Icon>
        </button>
        
      </div>
    </div>
  )
}

export default Movies