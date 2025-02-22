import '../styles/Card.css'

const Card = ({ movie, genres, detailMovie }) => {

  const handleCardClick = () => {
    detailMovie(movie)
  }

  const genresMap = genres.reduce((map, genre) => {
      map[genre.id] = genre.name;
    return map;
  }, {});

  return (
    <div className="card" onClick={handleCardClick}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p className='genre black'>{movie.genre_ids.map(id => genresMap[id]).join(' | ')}</p>
      <p className='name black'>{movie.title}</p>
    </div>
    )
}

export default Card