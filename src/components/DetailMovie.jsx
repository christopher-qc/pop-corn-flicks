import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Header from "./Header"
import { fetchCast } from '../apiServices';
import Carousel from './Carousel';

import '../styles/DetailMovie.css'

const DetailMovie = () => {
  const [cast, setCast] = useState([]);
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  const { data, genres } = location.state;
  // const [trailerKey, setTrailerKey] = useState(null);

  const showCast = async () => {
    try {
      const dataCast = await fetchCast(data.id);
      setCast(dataCast.cast);
      setLoaded(true);
    } catch {
      console.log('error')
    }
  }

  // const handleTrailerClick = async () => {
  //   const dataVideos = await fetchVideos();
  //   setTrailerKey(dataVideos[0].key);
  // }

  if (!loaded) {
    showCast();
  }

  const {backdrop_path, overview, poster_path, release_date, title, vote_average} = data

  const date = new Date(release_date);
  const year = date.getFullYear();
  const vote = vote_average.toFixed(1)

  return (
    <div className="app">
      <div className="blurry" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})` }}></div>
      <Header />  
      <div className="content">
        <img className="poster" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="" />
          <div className="details">
          <p className='title'>{title}</p>
          <p className='genre'>{data.genre_ids.map(id => genres[id]).join(' | ')}</p>
          <p>{year}</p>
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <i className="material-icons" style={{ fontSize: '18px', marginRight: '5px', color: 'yellow'}}>star</i>
            {vote} / 10
          </p>
          <div className="description-container">
            <p className='description'>{overview || 'Movie synopsis not available'}</p>
          </div>
          <p className='title' style={{ fontSize: '25px' }}>Cast</p>
          <Carousel images={cast} />
          {/*<button onClick={handleTrailerClick}>Ver Trailer</button>
          {trailerKey && (
            <div>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default DetailMovie