document.addEventListener('DOMContentLoaded', () => {
  const easeOutQuad = t => t * (2 - t);

  // === ANIMAR ELEMENTOS COM data-animate (com ou sem delay)
  const animateElement = el => {
    const anim = el.dataset.animate;
    const delay = parseInt(el.dataset.delay || '0', 10);
    setTimeout(() => {
      el.classList.remove('opacity-0');
      el.classList.add('animate-' + anim);
    }, delay);
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        animateElement(el);
        observer.unobserve(el);
      });
    },
    {
      threshold: 0.3,
      rootMargin: '0px 0px -10% 0px',
    },
  );

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });

  // === ROI COUNTER
  const roiEl = document.getElementById('roi-counter');
  if (roiEl) {
    const roiTarget = 248;
    const duration = 2000;
    const totalFrames = Math.round((duration / 1000) * 60);
    let frame = 0;

    const countROI = () => {
      frame++;
      const progress = frame / totalFrames;
      const current = Math.round(roiTarget * easeOutQuad(progress));
      roiEl.textContent = `${current}%`;
      if (frame < totalFrames) requestAnimationFrame(countROI);
    };

    setTimeout(countROI, 200);
  }

  // === COUNTERS (data-counter)
  const animateCounter = (el, target, suffix = '', duration = 3000) => {
    const totalFrames = Math.round((duration / 1000) * 60);
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
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseInt(el.dataset.counter, 10);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.3 },
  );

  document.querySelectorAll('[data-counter]').forEach(el => {
    counterObserver.observe(el);
  });
});

// Smooth Scroll
function smoothScrollTo(targetY, duration = 500) {
  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  const startTime = performance.now();

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOutQuad
  }

  function animateScroll(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeInOut(progress);

    window.scrollTo(0, startY + distance * easedProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1 && document.querySelector(href)) {
      e.preventDefault();

      const target = document.querySelector(href);
      const offset = 60; // Ajuste para header fixo
      const y = target.getBoundingClientRect().top + window.scrollY - offset;

      smoothScrollTo(y, 600); // ← duração de 600ms
    }
  });
});
