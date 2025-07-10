// Cacher le preloader une fois la page complètement chargée
window.addEventListener('load', function () {
    document.getElementById('loader').style.display = 'none';
});

// Apparition au scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.style.opacity = 1;
    });
}, { threshold: 0.1 });
document.querySelectorAll('section').forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transition = 'opacity 1s ease-in-out';
    observer.observe(sec);
});

// main.js
const nav = document.getElementById('main-nav');
const threshold = 100;
window.addEventListener('scroll', () => {
  window.scrollY > threshold
    ? nav.classList.add('scrolled')
    : nav.classList.remove('scrolled');
});


  document.addEventListener('DOMContentLoaded', () => {
    // Ouvre la modal correspondante
    document.querySelectorAll('.carte-projet[data-modal]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-modal');
        document.getElementById(id).classList.add('show');
      });
    });

    // Ferme quand on clique sur le bouton × ou en-dehors du contenu
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', e => {
        if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
          modal.classList.remove('show');
        }
      });
    });

    // Fermer à la touche Échap
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(m => m.classList.remove('show'));
      }
    });
  });

