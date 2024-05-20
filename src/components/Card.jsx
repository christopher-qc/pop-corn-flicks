import '../styles/Card.css'

const Card = ({ movie, genres }) => {
    
  return (
    <div className="card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p className='genre black'>{movie.genre_ids.map(id => genres[id]).join(' | ')}</p>
      <p className='name black'>{movie.title}</p>
    </div>
    )
}

export default Card