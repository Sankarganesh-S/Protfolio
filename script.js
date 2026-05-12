// ─── SCROLL REVEAL ───────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

revealEls.forEach(function(el) {
  observer.observe(el);
});

// ─── SMOOTH SCROLL ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── FOOTER YEAR ─────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ─── MOBILE NAV TOGGLE ───────────────────────────────────────
function toggleNav() {
  const nav = document.getElementById('navLinks');
  const icon = document.getElementById('hamIcon');
  const isOpen = nav.classList.toggle('open');
  icon.textContent = isOpen ? '✕' : '☰';
}

function closeNav() {
  const nav = document.getElementById('navLinks');
  const icon = document.getElementById('hamIcon');
  nav.classList.remove('open');
  icon.textContent = '☰';
}

// Close nav when clicking outside
document.addEventListener('click', function(e) {
  const nav = document.getElementById('navLinks');
  const btn = document.getElementById('hamburgerBtn');
  if (nav && nav.classList.contains('open')) {
    if (!nav.contains(e.target) && !btn.contains(e.target)) {
      closeNav();
    }
  }
});