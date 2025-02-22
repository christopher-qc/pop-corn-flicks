import { useState, useEffect }from 'react'
import ImageSlider from './ImageSlider'
import Info from './Info'
import Header from './Header'
import { HStack, Spinner } from "@chakra-ui/react"

import useStore from '@/store/useStore';


function App() {
  const [index, setIndex] = useState(0)

  const { movies, genres, loading, error, fetchMovies, fetchGenres } = useStore();  

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const indexChildren = (index) => {
    setIndex(index)
  };

  if (loading) {
    return (
      <HStack gap="5">
        <Spinner size="xl" />
      </HStack>
    )
  }

  return (
      <div className="app">
        {error && <p>{error}</p>}
        {movies.length && <div className="blurry-background" style={{ backgroundImage: `url(${movies[index].imageBig})` }}></div> }
        <Header />
         
        {movies.length && 
          <div className="content-container">
            <Info info={movies[index]} genres={genres} />
            <ImageSlider movies={movies} indexDad={indexChildren} />
          </div>
        }
      </div>
  )
}

export default App