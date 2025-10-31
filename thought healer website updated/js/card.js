
  document.addEventListener('DOMContentLoaded', function() {
    const cards = Array.from(document.querySelectorAll('.card'));

    // 1) Flip each card open one after the other (200ms apart)
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add('is-flipped'), i * 200);
    });

    // 2) After they're all open + 600ms extra, flip them closed in the same stagger
    const totalOpenTime = cards.length * 200 + 600;
    setTimeout(() => {
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.remove('is-flipped'), i * 200);
      });
    }, totalOpenTime);

    // 3) Then set up your original click‐to‐flip logic
    cards.forEach(card => {
      card.addEventListener('click', function(e) {
        // Prevent flipping if clicking buttons
        if (e.target.closest('.card-btn')) return;

        // Close any other flipped card before opening this one
        if (!this.classList.contains('is-flipped')) {
          cards.forEach(c => c !== this && c.classList.remove('is-flipped'));
        }

        this.classList.toggle('is-flipped');
      });
    });
  });
