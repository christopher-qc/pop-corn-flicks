import { useState } from 'react';
import '../styles/ImageSlider.css';

const ImageSlider = ({ movies, indexDad  }) => {
  const [currentIndex, setCurrentIndex] = useState(0);


  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? movies.length - 1 : currentIndex - 1;
    const obj = movies.find((m, index) => index === newIndex);
    indexDad(obj)
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === movies.length - 1 ? 0 : currentIndex + 1;
    const obj = movies.find((m, index) => index === newIndex);
    indexDad(obj)
    setCurrentIndex(newIndex);
  };

  return (
    <div className="slider">
      <div className="slider-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {movies.map((movie, index) => (
          <div
            className={`slider-item ${index === currentIndex ? 'active' : ''}`}
            key={movie.id}
          >
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          </div>
        ))}
      </div>
      <button className="slider-button prev" onClick={handlePrev}>
        &#10094;
      </button>
      <button className="slider-button next" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;
