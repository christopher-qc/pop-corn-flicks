import { useState } from 'react';

import '../styles/Carousel.css';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 5;


  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - itemsToShow : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - itemsToShow;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}>
        {images.map((image, index) => (
          <div className="carousel-item" key={index} style={{ flex: `0 0 ${100 / itemsToShow}%` }}>
            <img src={`https://image.tmdb.org/t/p/w500${image.profile_path}`} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <button className="carousel-button prev" onClick={goToPrevious}>&#10094;</button>
      <button className="carousel-button next" onClick={goToNext}>&#10095;</button>
    </div>
  );
};

export default Carousel;
