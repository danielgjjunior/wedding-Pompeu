import React from 'react';
import './WeddingCard.css';

const WeddingCard = ({ backgroundImage }) => {
  return (
    <div
      className="card-container loaded"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
    </div>
  );
};

export default WeddingCard;
