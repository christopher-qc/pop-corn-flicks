import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Header from "./Header"
import Carousel from './Carousel';
import { HStack, Spinner } from "@chakra-ui/react"

import useStore from '@/store/useStore';

import '../styles/DetailMovie.css'

const DetailMovie = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const { data, genres } = location.state;

  const { cast, videos, loading, error, fetchCast, fetchVideos } = useStore();

  useEffect(() => {
    fetchCast(data.id);
  }, [fetchCast, data.id]);

  useEffect(() => {
    fetchVideos(data.id);
  }, [fetchVideos, data.id]);

  const handleTrailerClick = async () => {
    if (videos) {
      setShowModal(true);
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const {backdrop_path, overview, poster_path, release_date, title, vote_average} = data

  const date = new Date(release_date);
  const year = date.getFullYear();
  const vote = vote_average.toFixed(1)

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
          <button className="trailer-button" onClick={handleTrailerClick}>Ver Trailer</button>
          {showModal && videos.length && (
            <div className="modal">
            <span className="close-btn" onClick={handleCloseModal}>&times;</span>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videos[0].key}`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div> 
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailMovie