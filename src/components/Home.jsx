import { useState, useEffect } from 'react'
import { Card } from './Card'

export function Home() {

    const [movies, setMovies] = useState([])

    const getMovie = () => {
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=9185ea3ac92a6f3d645a3b2f36bd921f')
      .then(res => res.json())
      .then(json => setMovies(json.results))
    }
  
    useEffect(() => {
      getMovie()
    },[])

    return (
        <div>
        {movies.map((m) => (
          <Card movie={m} key={m.id} />
        ))}
      </div>
    )
}