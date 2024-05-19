import '../styles/Info.css'

const Info = ({ info, genres }) => {
  const { title, overview, release_date, vote_average } = info
  const date = new Date(release_date);
  const year = date.getFullYear();
  const vote = vote_average.toFixed(1)

  return (
    <div className="info">
      <h1 className='title'>{title}</h1>
      <p className='genre'>{info.genre_ids.map(id => genres[id]).join(' | ')}</p>
      <p>{year}</p>
      <p style={{ display: 'flex', alignItems: 'center' }}>
        <i className="material-icons" style={{ fontSize: '18px', marginRight: '5px', color: 'yellow'}}>star</i>
        {vote} / 10
      </p>
      <div className="description-container">
        <p className='description'>{overview || 'Movie synopsis not available'}</p>
      </div>
    </div>
    )
}

export default Info