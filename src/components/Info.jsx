import '../styles/Info.css'

const Info = ({ info, genres }) => {
  const { title, overview, release_date, vote_average } = info
  const date = new Date(release_date);
  const year = date.getFullYear();
  const vote = vote_average.toFixed(1)

  const genresMap = genres.reduce((map, genre) => {
      map[genre.id] = genre.name;
    return map;
  }, {});

  return (
    <div className="info">
      <p className='title'>{title}</p>
      <p className='genre'>{info.genre_ids.map(id => genresMap[id]).join(' | ')}</p>
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