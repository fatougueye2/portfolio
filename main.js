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
    setTimeout(() => overlay.classList.add('fade-out'), 2000);

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
    const words = heading.textContent.trim().split(' ');
    heading.textContent = '';
    words.forEach((word, i) => {
        const span = document.createElement('span');
        span.textContent = word + (i < words.length - 1 ? ' ' : '');
        heading.appendChild(span);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  // Ouvre la modal SEULEMENT quand on clique sur le lien Discover
  document.querySelectorAll('.cta-link[data-modal]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.dataset.modal;
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
    const titleEl = document.getElementById('exp-title');
    const descEl = document.getElementById('exp-desc');

    // ① Initialisation du texte au chargement
    const first = carouselEl.querySelector('.carousel-item.active');
    titleEl.textContent = first.dataset.title;
    descEl.textContent = first.dataset.desc;

    // ② À chaque fin de slide, on met à jour titre + description
    carouselEl.addEventListener('slid.bs.carousel', e => {
        const item = e.relatedTarget; // la .carousel-item devenue active
        titleEl.textContent = item.dataset.title;
        descEl.textContent = item.dataset.desc;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var splide = new Splide('#splide-experience', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '1rem',
        autoplay: false,
        pagination: false,
        breakpoints: {
            992: { perPage: 2 },
            576: { perPage: 1 },
        },
    });

    // Au premier affichage, on injecte la description de la slide 0
    var descEl = document.getElementById('exp-description');
    descEl.textContent = splide.Components.Slides.getAt(0).slide.dataset.desc;

    // À chaque mouvement de Splide, on met à jour le texte
    splide.on('move', function (newIndex) {
        var slide = splide.Components.Slides.getAt(newIndex).slide;
        descEl.textContent = slide.dataset.desc;
    });

    splide.mount();
});


// 3. Sidebar “scrolled” : on observe la sortie du header (#accueil)
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
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

// Deconstructed card

document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".deconstructed-card");

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const xDeg = (y - 0.5) * 8;
        const yDeg = (x - 0.5) * -8;

        card.style.transform = `perspective(1200px) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;

        const layers = card.querySelectorAll(".card-layer");
        layers.forEach((layer, index) => {
            const depth = 30 * (index + 1);
            const translateZ = depth;
            const offsetX = (x - 0.5) * 10 * (index + 1);
            const offsetY = (y - 0.5) * 10 * (index + 1);
            layer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, ${translateZ}px)`;
        });

        const letters = card.querySelectorAll(".letter");
        letters.forEach((letter, index) => {
            const offsetX = (x - 0.5) * (index % 2 === 0 ? 15 : -15);
            const offsetY = (y - 0.5) * (index % 2 === 0 ? -10 : 10);
            const rotation = (x - 0.5) * (index % 2 === 0 ? 5 : -5);
            letter.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`;

            const shadow = letter.querySelector(".letter-shadow");
            if (shadow) {
                shadow.style.transform = `translate(${offsetX * 2}px, ${offsetY * 2}px)`;
            }
        });
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";

        const layers = card.querySelectorAll(".card-layer");
        layers.forEach((layer) => {
            layer.style.transform = "";
        });

        const letters = card.querySelectorAll(".letter");
        letters.forEach((letter) => {
            letter.style.transform = "";
            const shadow = letter.querySelector(".letter-shadow");
            if (shadow) {
                shadow.style.transform = "";
            }
        });
    });

    const glyphGrid = document.querySelector(".glyph-grid");
    if (glyphGrid) {
        const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
        for (let i = 0; i < 50; i++) {
            const glyph = document.createElement("div");
            glyph.className = "glyph";
            glyph.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
            glyph.style.left = `${Math.random() * 100}%`;
            glyph.style.top = `${Math.random() * 100}%`;
            glyph.style.transform = `rotate(${Math.random() * 360}deg)`;
            glyph.style.transitionDelay = `${Math.random() * 0.5}s`;
            glyphGrid.appendChild(glyph);
        }
    }

    const letters = document.querySelectorAll(".typographic-card .letter");
    letters.forEach((letter) => {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement("div");
            particle.className = "letter-particle";
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            letter.appendChild(particle);
        }
    });

    const typographicCard = document.querySelector(".typographic-card");
    if (typographicCard) {
        typographicCard.addEventListener("mouseenter", () => {
            const particles = typographicCard.querySelectorAll(".letter-particle");
            particles.forEach((particle) => {
                const angle = Math.random() * Math.PI * 2;
                const distance = 20 + Math.random() * 30;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = "0.6";
            });
        });

        typographicCard.addEventListener("mouseleave", () => {
            const particles = typographicCard.querySelectorAll(".letter-particle");
            particles.forEach((particle) => {
                particle.style.transform = "translate(0, 0)";
                particle.style.opacity = "0";
            });
        });
    }
});