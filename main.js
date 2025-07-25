document.addEventListener('DOMContentLoaded', () => {
  // 1) Animation de vague pour l'overlay (progression lettre par lettre)
  const wave = document.querySelector('.wave-text');
  if (wave) {
    const text = wave.textContent.trim();
    wave.textContent = ''; // Vider le contenu
    let totalDelay = 0;
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      // Décalage progressif pour chaque lettre sur toute la phrase
      span.style.animationDelay = `${totalDelay}s`;
      totalDelay += 0.1; // Incrément de 0.1s par lettre pour une progression fluide
      wave.appendChild(span);
    });
  }

  // 2) Gestion de l'overlay et animation post-fade-out (inchangé)
  const overlay = document.getElementById('loading-overlay');
  const heading = document.querySelector('.word-by-word');
  if (overlay) {
    // Déclencher le fade-out après 1,2 s
    setTimeout(() => overlay.classList.add('fade-out'), 1200);

    // Une fois le fade-out terminé, afficher le contenu principal et animer
    overlay.addEventListener('transitionend', () => {
      overlay.style.display = 'none';
      if (heading) {
        // Afficher le contenu principal
        document.getElementById('main-content').style.display = 'block';
        // Découper et animer .word-by-word
        const words = heading.textContent.trim().split(' ');
        heading.textContent = '';
        words.forEach((word, i) => {
          const span = document.createElement('span');
          span.textContent = word + (i < words.length - 1 ? ' ' : '');
          span.style.animation = `wordFadeUp .5s forwards ${0.4 * i}s`;
          heading.appendChild(span);
        });
      }
    }, { once: true });
  }
});

window.addEventListener('load', () => {
    const overlay = document.getElementById('loading-overlay');
    const heading = document.querySelector('.word-by-word');

    // 1) on attend 5s puis on déclenche la disparition de l’overlay
    setTimeout(() => overlay.classList.add('fade-out'), 1000);

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

//modal
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

// 4. Deconstructed card

document.addEventListener("DOMContentLoaded", () => {
  // ——— 1) Effet 3D sur TOUTES les cartes « deconstructed » ———
  document.querySelectorAll(".deconstructed-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width;
      const y    = (e.clientY - rect.top)  / rect.height;
      const xDeg = (y - 0.5) * 8;
      const yDeg = (x - 0.5) * -8;
      card.style.transform = `perspective(1200px) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;

      card.querySelectorAll(".card-layer").forEach((layer, i) => {
        const depth     = 30 * (i + 1);
        const offsetX   = (x - 0.5) * 10 * (i + 1);
        const offsetY   = (y - 0.5) * 10 * (i + 1);
        layer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, ${depth}px)`;
      });
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.querySelectorAll(".card-layer")
          .forEach(layer => layer.style.transform = "");
    });
  });

  // ——— 2) Glyph grid (si tu en as besoin) ———
  document.querySelectorAll(".glyph-grid").forEach(grid => {
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    for (let i = 0; i < 50; i++) {
      const g = document.createElement("div");
      g.className = "glyph";
      g.textContent = glyphs[Math.floor(Math.random()*glyphs.length)];
      g.style.left            = `${Math.random()*100}%`;
      g.style.top             = `${Math.random()*100}%`;
      g.style.transform       = `rotate(${Math.random()*360}deg)`;
      g.style.transitionDelay = `${Math.random()*0.5}s`;
      grid.appendChild(g);
    }
  });

  // ——— 3) Particules sur tes typographic-cards ———
  document.querySelectorAll(".typographic-card").forEach(card => {
    // 3.1 injecte les particules dans chaque lettre
    card.querySelectorAll(".letter").forEach(letter => {
      for (let i = 0; i < 5; i++) {
        const p = document.createElement("div");
        p.className = "letter-particle";
        p.style.left = `${Math.random()*100}%`;
        p.style.top  = `${Math.random()*100}%`;
        letter.appendChild(p);
      }
    });

    // 3.2 animate on hover
    card.addEventListener("mouseenter", () => {
      card.querySelectorAll(".letter-particle").forEach(particle => {
        const angle    = Math.random()*Math.PI*2;
        const distance = 20 + Math.random()*30;
        const x        = Math.cos(angle)*distance;
        const y        = Math.sin(angle)*distance;
        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity   = "0.6";
      });
    });
    card.addEventListener("mouseleave", () => {
      card.querySelectorAll(".letter-particle").forEach(particle => {
        particle.style.transform = "translate(0, 0)";
        particle.style.opacity   = "0";
      });
    });
  });
});
