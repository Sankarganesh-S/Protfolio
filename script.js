// ─── LOADER ─────────────────────────────────────────────
(function loader() {
    const fill = document.getElementById('loaderFill');
    const pct = document.getElementById('loaderPct');
    const loaderEl = document.getElementById('loader');
    let p = 0;
    const tick = setInterval(() => {
        p += Math.random() * 12 + 4;
        if (p >= 100) {
            p = 100;
            clearInterval(tick);
            setTimeout(() => loaderEl.classList.add('hidden'), 250);
        }
        fill.style.width = p + '%';
        pct.textContent = Math.floor(p);
    }, 90);
})();

// ─── TYPED ──────────────────────────────────────────────
(function typed() {
    const el = document.getElementById('typed');
    if (!el) return;
    const words = [
        'fast React apps.',
        'clean UIs.',
        'smooth animations.',
        'pixel-perfect layouts.',
        'delightful experiences.'
    ];
    let wi = 0, ci = 0, deleting = false;
    function loop() {
        const word = words[wi];
        if (!deleting) {
            el.textContent = word.slice(0, ++ci);
            if (ci === word.length) { deleting = true; setTimeout(loop, 1800); return; }
        } else {
            el.textContent = word.slice(0, --ci);
            if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
        }
        setTimeout(loop, deleting ? 35 : 75);
    }
    setTimeout(loop, 800);
})();

// ─── THEME TOGGLE ───────────────────────────────────────
(function theme() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const saved = localStorage.getItem('theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    btn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        showToast(next === 'dark' ? '🌙 Dark mode' : '☀️ Light mode', 'success');
    });
})();

// ─── TOAST ──────────────────────────────────────────────
function showToast(msg, type = '') {
    const t = document.getElementById('toast');
    if (!t) return;
    t.className = 'toast ' + type;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(window._toastT);
    window._toastT = setTimeout(() => t.classList.remove('show'), 2400);
}

// ─── COMMAND PALETTE ────────────────────────────────────
(function palette() {
    const el = document.getElementById('palette');
    const input = document.getElementById('paletteInput');
    const list = document.getElementById('paletteList');
    if (!el || !input || !list) return;

    const cmds = [
        { label: 'Go to Home', action: () => scrollTo('#home'), tag: 'g h' },
        { label: 'Go to About', action: () => scrollTo('#about'), tag: 'g a' },
        { label: 'Go to Services', action: () => scrollTo('#services'), tag: 'g s' },
        { label: 'Go to Skills', action: () => scrollTo('#skills'), tag: 'g k' },
        { label: 'Go to Experience', action: () => scrollTo('#experience'), tag: 'g e' },
        { label: 'Go to Projects', action: () => scrollTo('#projects'), tag: 'g p' },
        { label: 'Go to Contact', action: () => scrollTo('#contact'), tag: 'g c' },
        { label: 'Download Résumé', action: () => { window.location.href = './assets/resume.pdf'; }, tag: 'd r' },
        { label: 'Send me an Email', action: () => { window.location.href = 'mailto:sankarganesh.5.sh@gmail.com'; }, tag: 'e m' },
        { label: 'Open GitHub', action: () => { window.open('https://github.com/Sankarganesh-S', '_blank'); }, tag: 'o g' },
        { label: 'Open LinkedIn', action: () => { window.open('https://www.linkedin.com/in/sankar-ganesh-680a18260/', '_blank'); }, tag: 'o l' },
        { label: 'Toggle Theme', action: () => document.getElementById('themeToggle').click(), tag: 't t' },
        { label: 'Back to Top', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }), tag: 'b t' }
    ];

    let active = 0;
    function render(filter = '') {
        const f = filter.toLowerCase();
        const items = cmds.filter(c => c.label.toLowerCase().includes(f));
        list.innerHTML = items.map((c, i) => {
            const lbl = filter
                ? c.label.replace(new RegExp('(' + filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>')
                : c.label;
            return `<li class="${i === active ? 'active' : ''}" data-i="${i}">
                ${lbl}<span class="pal-tag">${c.tag}</span>
            </li>`;
        }).join('') || '<li style="color:var(--muted);cursor:default">No results</li>';
        list.querySelectorAll('li[data-i]').forEach(li => {
            li.addEventListener('click', () => { items[li.dataset.i].action(); close(); });
        });
    }
    function open() {
        el.classList.add('open'); el.setAttribute('aria-hidden', 'false');
        active = 0; input.value = ''; render(); setTimeout(() => input.focus(), 50);
    }
    function close() {
        el.classList.remove('open'); el.setAttribute('aria-hidden', 'true');
    }
    function scrollTo(sel) {
        const t = document.querySelector(sel);
        if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 70, behavior: 'smooth' });
        close();
    }

    document.addEventListener('keydown', e => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            el.classList.contains('open') ? close() : open();
        } else if (e.key === 'Escape' && el.classList.contains('open')) {
            close();
        } else if (el.classList.contains('open')) {
            if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, list.children.length - 1); render(input.value); }
            if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(active - 1, 0); render(input.value); }
            if (e.key === 'Enter') {
                e.preventDefault();
                const f = input.value.toLowerCase();
                const items = cmds.filter(c => c.label.toLowerCase().includes(f));
                if (items[active]) items[active].action();
            }
        }
    });
    el.addEventListener('click', e => { if (e.target === el) close(); });
    input.addEventListener('input', () => { active = 0; render(input.value); });
    render();
})();

// ─── CONTACT FORM ───────────────────────────────────────
function submitForm(e) {
    e.preventDefault();
    const form = e.target;
    const btn = document.getElementById('sendBtn');
    const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value.trim() || 'Portfolio Contact',
        message: form.message.value.trim()
    };
    if (!data.name || !data.email || !data.message) {
        showToast('⚠ Please fill all required fields', 'error');
        return false;
    }
    btn.innerHTML = '<span>Sending…</span>';
    btn.disabled = true;
    setTimeout(() => {
        const body = encodeURIComponent(
            `Hi Sankar,\n\n${data.message}\n\n— ${data.name}\n${data.email}`
        );
        const sub = encodeURIComponent(data.subject);
        window.location.href = `mailto:sankarganesh.5.sh@gmail.com?subject=${sub}&body=${body}`;
        showToast('✓ Opening your email client…', 'success');
        setTimeout(() => {
            btn.innerHTML = '<span>Send Message</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
            btn.disabled = false;
            form.reset();
        }, 1200);
    }, 500);
    return false;
}

// ─── REVEAL OBSERVER ────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const skillCards = document.querySelectorAll('.skill-card');
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
revealEls.forEach(el => observer.observe(el));
skillCards.forEach(el => observer.observe(el));

// ─── SMOOTH SCROLL ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href || href === '#' || href === '#home') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ─── FOOTER YEAR ────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── MOBILE NAV ─────────────────────────────────────────
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
document.addEventListener('click', e => {
    const nav = document.getElementById('navLinks');
    const btn = document.getElementById('hamburgerBtn');
    if (nav && nav.classList.contains('open')) {
        if (!nav.contains(e.target) && !btn.contains(e.target)) closeNav();
    }
});

// ─── CUSTOM CURSOR ──────────────────────────────────────
(function cursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    const c = document.getElementById('cursor');
    const d = document.getElementById('cursorDot');
    if (!c || !d) return;
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        d.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });
    (function raf() {
        cx += (mx - cx) * 0.18;
        cy += (my - cy) * 0.18;
        c.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
        requestAnimationFrame(raf);
    })();
    document.querySelectorAll(
        'a, button, .skill-card, .project-card, .stat-card, .social-btn, ' +
        '.btn-primary, .btn-ghost, .theme-toggle, .service-card, ' +
        '.testi-card, .info-row, .field input, .field textarea'
    ).forEach(el => {
        el.addEventListener('mouseenter', () => c.classList.add('hover'));
        el.addEventListener('mouseleave', () => c.classList.remove('hover'));
    });
})();

// ─── SCROLL EFFECTS ─────────────────────────────────────
(function scrollEffects() {
    const bar = document.getElementById('scrollProgress');
    const nav = document.getElementById('nav');
    const toTop = document.getElementById('toTop');
    function update() {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
        if (bar) bar.style.width = pct + '%';
        if (nav) nav.classList.toggle('scrolled', h.scrollTop > 30);
        if (toTop) toTop.classList.toggle('visible', h.scrollTop > 400);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
})();

// ─── ACTIVE NAV ─────────────────────────────────────────
(function activeNav() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');
    const obs = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    links.forEach(l => l.classList.remove('active'));
                    const a = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                    if (a) a.classList.add('active');
                }
            });
        },
        { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => obs.observe(s));
})();

// ─── STATS COUNTER ──────────────────────────────────────
(function counter() {
    const nums = document.querySelectorAll('.stat-num[data-count]');
    const obs = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseFloat(el.dataset.count);
                const suffix = el.dataset.suffix || '';
                const duration = 1400;
                const start = performance.now();
                function step(now) {
                    const t = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - t, 3);
                    const val = target * eased;
                    el.textContent = (Number.isInteger(target) ? Math.floor(val) : val.toFixed(1)) + suffix;
                    if (t < 1) requestAnimationFrame(step);
                    else el.textContent = target + suffix;
                }
                requestAnimationFrame(step);
                obs.unobserve(el);
            });
        },
        { threshold: 0.5 }
    );
    nums.forEach(n => obs.observe(n));
})();

// ─── 3D TILT ────────────────────────────────────────────
(function tilt() {
    if (window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('.project-card, .stat-card, .profile-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            const lift = card.classList.contains('profile-card') ? 0 : -6;
            card.style.transform = `translateY(${lift}px) perspective(800px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
})();

// ─── MAGNETIC BUTTONS ───────────────────────────────────
(function magnetic() {
    if (window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
})();
