window.addEventListener('load', () => {
  const overlay = document.getElementById('loading-overlay');
  if (!overlay) return;
  // 1. lance le fade-out
  overlay.classList.add('fade-out');
  // 2. au terme de la transition, on le retire du flux pour libérer le clic sous-jacent
  overlay.addEventListener('transitionend', () => {
    overlay.style.display = 'none';
  }, { once: true });
});

document.addEventListener('DOMContentLoaded', () => {
  const wave = document.querySelector('.wave-text');
  const text = wave.textContent;
  wave.textContent = '';          // on vide
  Array.from(text).forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    // applique l’anim wave, 0.1s de délai entre chaque lettre
    span.style.animation = `wave 1s ease-in-out ${i * 0.1}s infinite`;
    wave.appendChild(span);
  });
});


window.addEventListener('load', () => {
  const overlay = document.getElementById('loading-overlay');
  const heading = document.querySelector('.word-by-word');

  // 1) on attend 5s puis on déclenche la disparition de l’overlay
  setTimeout(() => overlay.classList.add('fade-out'), 1200);

  // 2) dès que le fade-out CSS (1s) est terminé, on construit et anime le texte
  overlay.addEventListener('transitionend', () => {
    // split + build des <span>
    const words = heading.textContent.trim().split(' ');
    heading.textContent = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.textContent = word + (i < words.length - 1 ? ' ' : '');
      span.style.animation = `wordFadeUp .5s forwards ${0.3 * i}s`;
      heading.appendChild(span);
    });
  }, { once: true });
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


// ① Au DOMContentLoaded, on découpe et on crée les spans SANS animation
document.addEventListener('DOMContentLoaded', () => {
  const heading = document.querySelector('.word-by-word');
  const words   = heading.textContent.trim().split(' ');
  heading.textContent = '';
  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.textContent = word + (i < words.length - 1 ? ' ' : '');
    heading.appendChild(span);
  });
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

document.addEventListener('DOMContentLoaded', () => {
  const carouselEl = document.getElementById('carouselIT');
  const titleEl    = document.getElementById('exp-title');
  const descEl     = document.getElementById('exp-desc');

  // ① Initialisation du texte au chargement
  const first = carouselEl.querySelector('.carousel-item.active');
  titleEl.textContent = first.dataset.title;
  descEl.textContent  = first.dataset.desc;

  // ② À chaque fin de slide, on met à jour titre + description
  carouselEl.addEventListener('slid.bs.carousel', e => {
    const item = e.relatedTarget; // la .carousel-item devenue active
    titleEl.textContent = item.dataset.title;
    descEl.textContent  = item.dataset.desc;
  });
});

  document.addEventListener( 'DOMContentLoaded', function () {
    var splide = new Splide( '#splide-experience', {
      type    : 'loop',
      perPage : 3,
      perMove : 1,
      gap     : '1rem',
      autoplay: false,
      pagination: false,
      breakpoints: {
        992: { perPage: 2 },
        576: { perPage: 1 },
      },
    } );

    // Au premier affichage, on injecte la description de la slide 0
    var descEl = document.getElementById('exp-description');
    descEl.textContent = splide.Components.Slides.getAt(0).slide.dataset.desc;

    // À chaque mouvement de Splide, on met à jour le texte
    splide.on( 'move', function ( newIndex ) {
      var slide = splide.Components.Slides.getAt( newIndex ).slide;
      descEl.textContent = slide.dataset.desc;
    } );

    splide.mount();
  } );


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