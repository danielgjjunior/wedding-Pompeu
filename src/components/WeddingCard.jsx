import React, { useState, useEffect } from 'react';
import './WeddingCard.css';
import WeddingCardDefault from '../assets/wedding-card.svg'; 
import WeddingCardPortrait from '../assets/wedding-card-portrait.svg';
import WeddingCardPortraitSmall from '../assets/wedding-card-portrait-small.svg';

const WeddingCard = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
      });
    };

    const loadImages = async () => {
      try {
        const largeImage = loadImage(WeddingCardDefault);
        const mediumImage = loadImage(WeddingCardPortrait);
        const smallImage = loadImage(WeddingCardPortraitSmall);
        await Promise.all([largeImage, mediumImage, smallImage]);
        setIsLoaded(true);
      } catch (err) {
        console.error("Error loading images", err);
      }
    };

    loadImages();
  }, []);

  return (
    <div className={`card-container ${isLoaded ? 'loaded' : 'loading'}`}>
      {!isLoaded && <div className="loading-spinner">Loading...</div>}
    </div>
  );
}

export default WeddingCard;
