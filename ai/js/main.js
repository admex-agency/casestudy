(() => {
  const progress = document.getElementById('progress');
  const updateProgress = () => {
    if (!progress) return;
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    progress.style.width = Math.max(0, Math.min(100, pct)) + '%';
  };
  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('img');
    const targets = document.querySelectorAll('.evidence-image img, .namlong-shot img');
    const openLightbox = (img) => {
      if (!lightboxImg) return;
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    const closeLightbox = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      if (lightboxImg) lightboxImg.src = '';
      document.body.style.overflow = '';
    };
    targets.forEach(img => img.addEventListener('click', () => openLightbox(img)));
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox || event.target.closest('.lightbox-close')) closeLightbox();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  }
})();

// Mobile case navigation dropdown
(() => {
  const nav = document.querySelector('.nav');
  const badge = nav?.querySelector('.nav-badge');
  if (!nav || !badge) return;

  badge.setAttribute('role', 'button');
  badge.setAttribute('tabindex', '0');
  badge.setAttribute('aria-haspopup', 'true');
  badge.setAttribute('aria-expanded', 'false');
  badge.setAttribute('aria-label', 'Mở danh sách case study');

  const setOpen = (open) => {
    nav.classList.toggle('case-menu-open', open);
    document.body.classList.toggle('case-menu-open', open);
    badge.setAttribute('aria-expanded', String(open));
  };

  const toggle = () => setOpen(!nav.classList.contains('case-menu-open'));
  badge.addEventListener('click', toggle);
  badge.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('case-menu-open')) return;
    const switcher = document.querySelector('.case-switcher');
    if (!nav.contains(event.target) && !switcher?.contains(event.target)) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) setOpen(false);
  });
})();
