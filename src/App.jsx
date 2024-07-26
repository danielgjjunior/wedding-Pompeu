import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import './App.css';
import smallPortrait from './assets/wedding-card-portrait-small.svg';
import portrait from './assets/wedding-card-portrait.svg';
import landscape from './assets/wedding-card.svg';
import loadingAnimation from './assets/loading.json'; 

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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="container">
      {loading && (
        <div className="loading">
          Carregando...
          <Lottie options={defaultOptions} height={100} width={100} />
        </div>
      )}
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
