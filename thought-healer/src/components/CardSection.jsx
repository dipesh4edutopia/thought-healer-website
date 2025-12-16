import React from 'react';
import FlipCard from './FlipCard';
import './CardSection.css';

const CardSection = () => {
  const cards = [
    {
      category: 'anxiety',
      difficulty: '2',
      frontIcon: 'fa-child',
      frontTitle: 'Do u have a troubled child?',
      backImage: '/card1.jpeg'
    },
    {
      category: 'depression',
      difficulty: '3',
      frontIcon: 'fa-venus',
      frontTitle: 'Are you female with mild/severe mental issues?',
      backImage: '/card2.jpeg'
    },
    {
      category: 'stress',
      difficulty: '1',
      frontIcon: 'fa-brain',
      frontTitle: 'Are you facing mental health issues?',
      backImage: '/card3.jpeg'
    },
    {
      category: 'anxiety',
      difficulty: '2',
      frontIcon: 'fa-briefcase-medical',
      frontTitle: "Are you a professional who's stressed out?",
      backImage: '/card4.jpeg'
    }
  ];

  return (
    <section id="support-cards" className="py-16">
      <h1 className="card-section-title">
        Click the problem you have
      </h1>

      <div className="th-card-grid">
        {cards.map((card, index) => (
          <FlipCard
            key={index}
            category={card.category}
            difficulty={card.difficulty}
            frontIcon={card.frontIcon}
            frontTitle={card.frontTitle}
            backImage={card.backImage}
          />
        ))}
      </div>
    </section>
  );
};

export default CardSection;
