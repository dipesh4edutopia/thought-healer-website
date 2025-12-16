import React, { useState } from 'react';

const FlipCard = ({ category, difficulty, frontIcon, frontTitle, backImage }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`th-card ${isFlipped ? 'is-flipped' : ''}`}
      data-category={category}
      data-difficulty={difficulty}
      onClick={handleCardClick}
    >
      <div className="th-card-inner">
        {/* Front Face */}
        <div className="th-card-face th-card-front">
          <div className="th-card-front-content">
            <div className="th-card-icon">
              <i className={`fas ${frontIcon}`}></i>
            </div>
            <h3>{frontTitle}</h3>
            <span className="th-flip-badge">Flip Me</span>
          </div>
        </div>

        {/* Back Face */}
        <div className="th-card-face th-card-back">
          <img src={backImage} alt={frontTitle} className="th-card-back-image" />
          <div className="th-card-buttons">
            <button className="th-card-btn" onClick={(e) => e.stopPropagation()}>
              <i className="fas fa-download"></i> Download
            </button>
            <a href="#features" onClick={(e) => e.stopPropagation()}>
              <button className="th-card-btn">
                <i className="fas fa-list"></i> Features
              </button>
            </a>
            <a href="#pricing" onClick={(e) => e.stopPropagation()}>
              <button className="th-card-btn">
                <i className="fas fa-tag"></i> Pricing
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
