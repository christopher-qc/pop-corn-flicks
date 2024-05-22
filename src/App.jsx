import './App.css'
import Home from './components/Home'
import Movies from './components/Movies'
import DetailMovie from './components/DetailMovie'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/detail' element={<DetailMovie />} />
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
