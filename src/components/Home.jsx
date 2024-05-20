import { useState }from 'react'
import ImageSlider from './ImageSlider'
import Info from './Info'
import Header from './Header'

import { fetchAllMovies, fetchGenres } from '../apiServices'

function App() {

  const [movies, setMovies] = useState([])
  const [urlImage, setUrlImage] = useState('')
  const [loaded, setLoaded] = useState(false);
  // const [load, setLoad] = useState(false);
  const [firstObj, setFirstObj] = useState({});
  const [genres, setGenres] = useState({});

  const fetchMovies = async () => {

    // if(load) {setMovies([]);}

    try {
      const data = await fetchAllMovies();
      const dataGenres = await fetchGenres();
      const genresMap = dataGenres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
      }, {});
      setGenres(genresMap);
      setMovies(prevMovies => [...prevMovies, ...data.results]);
      setLoaded(true);
      setFirstObj(data.results[0]);
      setUrlImage(`https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`)
    } catch (err) {
      console.error(err);
    }
  };

  if (!loaded) {
    fetchMovies();
  }
  

  const indexChildren = (obj) => {
    const url = `https://image.tmdb.org/t/p/w500${obj.poster_path}`
    setUrlImage(url);
    setFirstObj(obj);
  };

  return (
      <div className="app">
        <div className="blurry-background" style={{ backgroundImage: `url(${urlImage})` }}></div>
        <Header />
        <div className="content-container">
          {loaded && <Info info={firstObj} genres={genres} />}
          <ImageSlider movies={movies} indexDad={indexChildren} />
        </div>
      </div>
  )
}

export default App