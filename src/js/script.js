document.addEventListener('DOMContentLoaded', () => {
  const easeOutQuad = t => t * (2 - t);

  // Animação do ROI (0% até 248%)
  const roiEl = document.getElementById('roi-counter');
  if (roiEl) {
    const roiTarget = 248;
    const roiDuration = 2000;
    const frameRate = 60;
    const roiTotalFrames = Math.round((roiDuration / 1000) * frameRate);
    let roiFrame = 0;

    const countROI = () => {
      roiFrame++;
      const progress = roiFrame / roiTotalFrames;
      const current = Math.round(roiTarget * easeOutQuad(progress));
      roiEl.textContent = `${current}%`;

      if (roiFrame < roiTotalFrames) {
        requestAnimationFrame(countROI);
      }
    };

    setTimeout(() => countROI(), 200);
  }

  // Animação de entrada por data-animate
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const anim = el.dataset.animate;

          el.classList.remove('opacity-0');
          el.classList.add('animate-' + anim);

          observer.unobserve(el); // anima só 1x
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: '0px 0px -10% 0px',
    },
  );

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });

  // Animação de contadores (data-counter)
  const animateCounter = (el, target, suffix = '', duration = 3000) => {
    const frameRate = 80;
    const totalFrames = Math.round((duration / 1000) * frameRate);
    let frame = 0;

    const count = () => {
      frame++;
      const progress = frame / totalFrames;
      const current = Math.round(target * easeOutQuad(progress));
      el.textContent = `${current.toLocaleString()}${suffix}`;
      if (frame < totalFrames) requestAnimationFrame(count);
    };

    count();
  };

  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter, 10);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.3 },
  );

  document.querySelectorAll('[data-counter]').forEach(el => {
    counterObserver.observe(el);
  });
});
