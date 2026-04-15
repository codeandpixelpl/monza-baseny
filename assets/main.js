// ---------- HERO VIDEO CAROUSEL ----------
(() => {
  const stage = document.querySelector('.hero-stage');
  if (!stage) return;
  const slides = stage.querySelectorAll('.hero-slide');
  const progress = document.querySelectorAll('.hero-progress button');
  const counter = document.querySelector('.hero-counter em');
  let idx = 0;
  let timer;
  const DURATION = 7000;

  const go = (next) => {
    slides[idx].classList.remove('is-active');
    progress[idx].classList.remove('is-active');
    progress[idx].querySelector('.fill').style.right = '100%';
    idx = (next + slides.length) % slides.length;
    slides[idx].classList.add('is-active');
    progress[idx].classList.add('is-active');
    if (counter) counter.textContent = String(idx + 1).padStart(2, '0');
  };

  const start = () => {
    clearInterval(timer);
    timer = setInterval(() => go(idx + 1), DURATION);
  };

  progress.forEach((p, i) => {
    p.addEventListener('click', () => { go(i); start(); });
  });

  slides[0].classList.add('is-active');
  progress[0].classList.add('is-active');
  start();
})();

// ---------- GRID TOGGLE (press G) ----------
document.addEventListener('keydown', (e) => {
  if (e.key === 'g' || e.key === 'G') document.body.classList.toggle('show-grid');
});

// ---------- ACTIVE NAV ----------
(() => {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav ul a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('is-active');
    }
  });
})();

// ---------- TESTIMONIAL TRACK — duplicate for seamless loop ----------
(() => {
  const track = document.querySelector('.t-track');
  if (!track) return;
  track.innerHTML += track.innerHTML;
})();

// ---------- MARQUEE duplication ----------
(() => {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  track.innerHTML += track.innerHTML;
})();
