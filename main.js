// main.js

// 1. Preloader : on cache le loader quand la page est complètement chargée
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';
});

// 2. Fade-in des sections au scroll avec IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  const fadeObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transition = 'opacity 1s ease-in-out';
    fadeObserver.observe(sec);
  });
});

// 3. Sidebar “scrolled” : on observe la sortie du header (#accueil)
document.addEventListener('DOMContentLoaded', () => {
  const nav  = document.getElementById('main-nav');
  const hero = document.getElementById('accueil');
  if (nav && hero) {
    new IntersectionObserver(([entry]) => {
      // Dès que #accueil n'est plus visible, on ajoute .scrolled
      nav.classList.toggle('scrolled', !entry.isIntersecting);
    }, {
      root: null,
      threshold: 0,
      rootMargin: '-50px 0px 0px 0px'
    }).observe(hero);
  }
});

// 4. Modals : ouverture et fermeture
document.addEventListener('DOMContentLoaded', () => {
  // Ouvre la modal liée à chaque carte
  document.querySelectorAll('.carte-projet[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.modal;
      document.getElementById(id)?.classList.add('show');
    });
  });

  // Ferme si on clique sur le fond ou le bouton ×
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal || e.target.classList.contains('modal-close')) {
        modal.classList.remove('show');
      }
    });
  });

  // Ferme à la touche Échap
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.show')
              .forEach(m => m.classList.remove('show'));
    }
  });
});

// 5. Carrousels : on initialise un carrousel par .carousel-wrapper
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const [prev, next] = wrapper.querySelectorAll('.carousel-btn');
    if (!track || !prev || !next) return;

    // calcul du pas (largeur d’une carte + gap)
    const card = track.querySelector('.exp-card');
    const gap  = parseInt(getComputedStyle(track).gap) || 16;
    const step = card ? card.getBoundingClientRect().width + gap : 0;

    prev.addEventListener('click', () => {
      track.scrollBy({ left: -step, behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
      track.scrollBy({ left:  step, behavior: 'smooth' });
    });

    const updateButtons = () => {
      prev.disabled = track.scrollLeft <= 0;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    };
    track.addEventListener('scroll', updateButtons);
    updateButtons();
  });
});
