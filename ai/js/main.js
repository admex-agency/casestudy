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
