import '../styles/Info.css'

const Info = ({ info, genres }) => {
  const { title, overview, release_date } = info
  const date = new Date(release_date);
  const year = date.getFullYear();


  return (
    <div className="info">
      <h1 className='title'>{title}</h1>
      <p>{year}</p>
      <p className='genre'>{info.genre_ids.map(id => genres[id]).join(' | ')}</p>
      <div className="description-container">
        <p className='description'>{overview}</p>
      </div>
    </div>
    )
}

export default Info