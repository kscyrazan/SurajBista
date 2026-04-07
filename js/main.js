document.addEventListener('DOMContentLoaded', () => {

  // ---- Scrolled nav ----
  const nav = document.getElementById('nav');
  const tick = () => nav && nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', tick, { passive: true });
  tick();

  // ---- Active link ----
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a, .nav-overlay a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });

  // ---- Mobile nav ----
  const burger  = document.querySelector('.nav-burger');
  const overlay = document.querySelector('.nav-overlay');

  burger?.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    overlay?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  overlay?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger?.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- Intersection reveal ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.reveal, .work-item').forEach(el => io.observe(el));

});
