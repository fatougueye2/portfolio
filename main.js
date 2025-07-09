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

