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


document.addEventListener('DOMContentLoaded', () => {
  const track       = document.querySelector('.carousel-track');
  const slides      = Array.from(track.children);
  const prevButton  = document.querySelector('.carousel-button.prev');
  const nextButton  = document.querySelector('.carousel-button.next');
  const dotsContainer = document.querySelector('.dots-container');

  // 1) on calcule la largeur hors-gap d’une “slide”
  const slideWidth = slides[0].getBoundingClientRect().width;
  const gap = parseInt(getComputedStyle(track).gap) || 0;

  // 2) on positionne chaque slide côte-à-côte
  slides.forEach((slide, i) => {
    slide.style.left = (slideWidth + gap) * i + 'px';
  });

  // 3) on crée les puces “dots”
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);
  let currentIndex = 0;

  function updateCarousel(newIndex) {
    // bornes
    if (newIndex < 0 || newIndex >= slides.length) return;
    // 1) déplacer le track
    track.style.transform = `translateX(-${(slideWidth + gap) * newIndex}px)`;
    // 2) mettre à jour les boutons
    prevButton.disabled = newIndex === 0;
    nextButton.disabled = newIndex === slides.length - 1;
    // 3) activer la bonne dot
    dots[currentIndex].classList.remove('active');
    dots[newIndex].classList.add('active');
    currentIndex = newIndex;
  }

  // click flèches
  prevButton.addEventListener('click', () => updateCarousel(currentIndex - 1));
  nextButton.addEventListener('click', () => updateCarousel(currentIndex + 1));

  // click dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => updateCarousel(+dot.dataset.index));
  });
});

document.addEventListener("DOMContentLoaded", () => {
	const track = document.querySelector(".carousel-track");
	const cards = document.querySelectorAll(".deconstructed-card");
	const prevBtn = document.querySelector(".carousel-button.prev");
	const nextBtn = document.querySelector(".carousel-button.next");
	const dotsContainer = document.querySelector(".dots-container");

	cards.forEach((_, index) => {
		const dot = document.createElement("div");
		dot.classList.add("dot");
		if (index === 0) dot.classList.add("active");
		dot.addEventListener("click", () => goToCard(index));
		dotsContainer.appendChild(dot);
	});

	const dots = document.querySelectorAll(".dot");

	const cardWidth = cards[0].offsetWidth;
	const cardMargin = 40;
	const totalCardWidth = cardWidth + cardMargin;

	let currentIndex = 0;

	cards.forEach((card) => {
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
			const waveSvg = card.querySelector(".wave-svg");
			if (waveSvg) {
				const moveX = (x - 0.5) * -20;
				const moveY = (y - 0.5) * -20;
				waveSvg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
				const wavePaths = waveSvg.querySelectorAll("path:not(:first-child)");
				wavePaths.forEach((path, index) => {
					const factor = 1 + index * 0.5;
					const waveX = moveX * factor * 0.5;
					const waveY = moveY * factor * 0.3;
					path.style.transform = `translate(${waveX}px, ${waveY}px)`;
				});
			}
			const bgObjects = card.querySelectorAll(".bg-object");
			bgObjects.forEach((obj, index) => {
				const factorX = (index + 1) * 10;
				const factorY = (index + 1) * 8;
				const moveX = (x - 0.5) * factorX;
				const moveY = (y - 0.5) * factorY;
				if (obj.classList.contains("square")) {
					obj.style.transform = `rotate(45deg) translate(${moveX}px, ${moveY}px)`;
				} else if (obj.classList.contains("triangle")) {
					obj.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) scale(1)`;
				} else {
					obj.style.transform = `translate(${moveX}px, ${moveY}px)`;
				}
			});
		});

		card.addEventListener("mouseleave", () => {
			card.style.transform = "";
			const layers = card.querySelectorAll(".card-layer");
			layers.forEach((layer) => {
				layer.style.transform = "";
			});
			const waveSvg = card.querySelector(".wave-svg");
			if (waveSvg) {
				waveSvg.style.transform = "";
				const wavePaths = waveSvg.querySelectorAll("path:not(:first-child)");
				wavePaths.forEach((path) => {
					path.style.transform = "";
				});
			}
			const bgObjects = card.querySelectorAll(".bg-object");
			bgObjects.forEach((obj) => {
				if (obj.classList.contains("square")) {
					obj.style.transform = "rotate(45deg) translateY(-20px)";
				} else if (obj.classList.contains("triangle")) {
					obj.style.transform = "translate(-50%, -50%) scale(0.5)";
				} else {
					obj.style.transform = "translateY(20px)";
				}
			});
		});
	});

	function goToCard(index) {
		index = Math.max(0, Math.min(index, cards.length - 1));

		currentIndex = index;
		updateCarousel();
	}

	function updateCarousel() {
		const translateX = -currentIndex * totalCardWidth;

		track.style.transform = `translateX(${translateX}px)`;

		dots.forEach((dot, index) => {
			dot.classList.toggle("active", index === currentIndex);
		});
	}

	prevBtn.addEventListener("click", () => {
		goToCard(currentIndex - 1);
	});

	nextBtn.addEventListener("click", () => {
		goToCard(currentIndex + 1);
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "ArrowLeft") {
			goToCard(currentIndex - 1);
		} else if (e.key === "ArrowRight") {
			goToCard(currentIndex + 1);
		}
	});

	let touchStartX = 0;
	let touchEndX = 0;

	track.addEventListener("touchstart", (e) => {
		touchStartX = e.changedTouches[0].screenX;
	});

	track.addEventListener("touchend", (e) => {
		touchEndX = e.changedTouches[0].screenX;
		handleSwipe();
	});

	function handleSwipe() {
		if (touchStartX - touchEndX > 50) {
			goToCard(currentIndex + 1);
		} else if (touchEndX - touchStartX > 50) {
			goToCard(currentIndex - 1);
		}
	}

	window.addEventListener("resize", () => {
		const newCardWidth = cards[0].offsetWidth;
		const newTotalCardWidth = newCardWidth + cardMargin;

		const translateX = -currentIndex * newTotalCardWidth;
		track.style.transition = "none";
		track.style.transform = `translateX(${translateX}px)`;

		setTimeout(() => {
			track.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
		}, 50);
	});

	updateCarousel();
});
