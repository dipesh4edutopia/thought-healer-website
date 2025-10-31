// js/card.js

document.addEventListener('DOMContentLoaded', function() {
  // 1) Grab all of our cards by the new .th-card class
  const cards = Array.from(document.querySelectorAll('.th-card'));

  // 2) Flip each card open one after the other (200ms apart)
  cards.forEach((card, i) => {
    setTimeout(() => card.classList.add('is-flipped'), i * 200);
  });

  // 3) After they're all open + 600ms extra, flip them closed in the same stagger
  const totalOpenTime = cards.length * 200 + 600;
  setTimeout(() => {
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.remove('is-flipped'), i * 200);
    });
  }, totalOpenTime);

  // 4) Then set up your click‐to‐flip logic
  cards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Prevent flipping if clicking one of the back‐face buttons
      if (e.target.closest('.th-card-btn')) return;

      // Close any other flipped card before opening this one
      if (!this.classList.contains('is-flipped')) {
        cards.forEach(c => c !== this && c.classList.remove('is-flipped'));
      }

      // Toggle this card
      this.classList.toggle('is-flipped');
    });
  });
});
