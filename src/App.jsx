import React, { useState, useEffect } from 'react';
import './App.css';
import smallPortrait from './assets/wedding-card-portrait-small.svg';
import portrait from './assets/wedding-card-portrait.svg';
import landscape from './assets/wedding-card.svg';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let src;
      if (width < 600) {
        src = smallPortrait;
      } else if (width < 900) {
        src = portrait;
      } else {
        src = landscape;
      }
      setImageSrc(src);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="container">
      {loading && <div className="loading">Loading...</div>}
      <img
        src={imageSrc}
        alt="Wedding Card"
        className={`responsive-image ${loading ? 'hidden' : ''}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default App;
