import React, { useState, useEffect } from 'react';
import WeddingCard from './components/WeddingCard';
import WeddingCardDefault from './assets/wedding-card.svg'; 
import WeddingCardPortrait from './assets/wedding-card-portrait.svg';
import WeddingCardPortraitSmall from './assets/wedding-card-portrait-small.svg';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = (err) => reject(err);
      });
    };

    const loadImages = async () => {
      try {
        const largeImage = loadImage(WeddingCardDefault);
        const mediumImage = loadImage(WeddingCardPortrait);
        const smallImage = loadImage(WeddingCardPortraitSmall);
        const images = await Promise.all([largeImage, mediumImage, smallImage]);
        setBackgroundImage(images[0]); // Set the first image as default
        setIsLoaded(true);
      } catch (err) {
        console.error("Error loading images", err);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    const updateBackgroundImage = () => {
      const width = window.innerWidth;
      if (width <= 600) {
        setBackgroundImage(WeddingCardPortraitSmall);
      } else if (width <= 1200) {
        setBackgroundImage(WeddingCardPortrait);
      } else {
        setBackgroundImage(WeddingCardDefault);
      }
    };

    updateBackgroundImage();
    window.addEventListener('resize', updateBackgroundImage);

    return () => {
      window.removeEventListener('resize', updateBackgroundImage);
    };
  }, []);

  return (
    <div className="App">
      {!isLoaded && <div className="loading-spinner">Loading...</div>}
      {isLoaded && <WeddingCard backgroundImage={backgroundImage} />}
    </div>
  );
}

export default App;
