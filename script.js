// Step 1: .reveal class உள்ள எல்லா elements-ஐ select பண்ணு
const revealEls = document.querySelectorAll('.reveal');

// Step 2: Observer create பண்ணு
const observer = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {

      // Element screen-ல visible ஆனா?
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }

    });
  },
  { threshold: 0.1 }   // 10% visible ஆனா trigger
);

// Step 3: ஒவ்வொரு element-ஐயும் observe பண்ணு
revealEls.forEach(function(el) {
  observer.observe(el);
});

// Step 4: Smooth scroll — nav link click பண்ணா
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
function toggleNav() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('open');
}

// Nav link click  auto-close 
document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function() {
    document.getElementById('navLinks').classList.remove('open');
  });
});
