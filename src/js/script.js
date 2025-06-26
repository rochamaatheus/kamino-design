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

  // === COUNTERS (data-counter) - Versão simplificada e corrigida
  const animateCounter = (el, target, suffix = '', duration = 3000) => {
    const totalFrames = Math.round((duration / 1000) * 60);
    let frame = 0;

    // Função de formatação simplificada
    const formatNumber = num => {
      if (window.innerWidth < 600) {
        if (num >= 1_000_000) {
          return (num / 1_000_000).toFixed(1).replace('.0', '') + 'm';
        }
        if (num >= 1_000) {
          return (num / 1_000).toFixed(1).replace('.0', '') + 'k';
        }
      }
      return num.toLocaleString();
    };

    const count = () => {
      frame++;
      const progress = frame / totalFrames;
      const current = Math.round(target * easeOutQuad(progress));

      el.textContent = formatNumber(current) + suffix;

      if (frame < totalFrames) requestAnimationFrame(count);
    };

    count();
  };

  // Restante do código do observer permanece igual
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

// Smooth Scroll Function
function smoothScrollTo(targetY, duration = 500) {
  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  const startTime = performance.now();

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
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

// Scroll em clique
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (href.length > 1 && document.querySelector(href)) {
      const target = document.querySelector(href);

      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 60;

      const y =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      smoothScrollTo(y, 600);
    }
  });
});

// Scroll ao carregar a página se tem hash
window.addEventListener('load', () => {
  const hash = window.location.hash;
  if (hash.length > 1) {
    const target = document.querySelector(hash);
    if (target) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 60;

      const y =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      setTimeout(() => {
        smoothScrollTo(y, 600);
      }, 100); // Dá um pequeno delay pra garantir que carregou
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const barsIcon = mobileMenuButton.querySelector('i');

  // Abrir menu mobile
  mobileMenuButton.addEventListener('click', function () {
    const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('open');

    // Alternar ícone
    if (barsIcon.classList.contains('fa-bars')) {
      barsIcon.classList.remove('fa-bars');
      barsIcon.classList.add('fa-times');
    } else {
      barsIcon.classList.remove('fa-times');
      barsIcon.classList.add('fa-bars');
    }
  });

  // Fechar menu ao clicar em um link
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function () {
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      barsIcon.classList.remove('fa-times');
      barsIcon.classList.add('fa-bars');
    });
  });
});

document.querySelectorAll('details').forEach(detail => {
  detail.addEventListener('toggle', e => {
    if (detail.open) {
      const content = detail.querySelector('.faq-content');
      content.style.height = content.scrollHeight + 'px';
      setTimeout(() => {
        content.style.height = 'auto';
      }, 300);
    } else {
      const content = detail.querySelector('.faq-content');
      content.style.height = content.scrollHeight + 'px';
      setTimeout(() => {
        content.style.height = '0';
      }, 10);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  /* ========= TOASTER ==================================================== */
  const toastStack = (() => {
    let el = document.getElementById('toastStack');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toastStack';
      el.className = 'fixed top-6 right-6 z-[9999] space-y-4';
      document.body.appendChild(el);
    }
    return el;
  })();

  const toast = (msg, ok = true, timeout = 4000) => {
    const t = document.createElement('div');
    t.className = `
      px-4 py-3 rounded-md shadow-lg flex items-center gap-3
      ${ok ? 'bg-green-600' : 'bg-red-600'}
      text-white animate-slide-in-right`;
    t.innerHTML = `
      <i class="fas ${ok ? 'fa-check-circle' : 'fa-times-circle'}"></i>
      <span>${msg}</span>`;
    toastStack.appendChild(t);

    setTimeout(() => {
      t.classList.replace('animate-slide-in-right', 'animate-fade-out');
      t.addEventListener('animationend', () => t.remove());
    }, timeout);
  };

  /* ========= FORM CONTATO ============================================== */
  const form = document.getElementById('contatoForm');
  if (!form) return;

  const btn = form.querySelector('button[type="submit"]');

  const showErr = (input, msg) => {
    let e = input.parentNode.querySelector('.form-error');
    if (!e) {
      e = document.createElement('p');
      e.className = 'form-error mt-2 text-sm text-red-600';
      input.parentNode.appendChild(e);
    }
    e.textContent = msg;
  };
  const clearErr = input => {
    const e = input.parentNode.querySelector('.form-error');
    if (e) e.remove();
  };

  const validPhone = v => {
    const d = v.replace(/\D+/g, '');
    if (d.startsWith('55') && (d.length < 12 || d.length > 13)) return false;
    if (!d.startsWith('55') && (d.length < 10 || d.length > 11)) return false;
    return true;
  };

  const rules = {
    nome: v =>
      v.trim() ? { ok: true } : { ok: false, msg: 'Nome obrigatório.' },
    email: v =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? { ok: true }
        : { ok: false, msg: 'E-mail inválido.' },
    telefone: v =>
      validPhone(v) ? { ok: true } : { ok: false, msg: 'Telefone inválido.' },
    servico: v =>
      v ? { ok: true } : { ok: false, msg: 'Selecione um serviço.' },
    investimento: v =>
      v ? { ok: true } : { ok: false, msg: 'Selecione a faixa.' },
  };

  form.querySelectorAll('input, select').forEach(i => {
    i.addEventListener('input', () => clearErr(i));
    i.addEventListener('change', () => clearErr(i));
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    let hasErr = false;
    Object.entries(rules).forEach(([name, fn]) => {
      const inp = form.elements[name];
      if (!inp) return;
      const { ok, msg } = fn(inp.value);
      if (!ok) {
        showErr(inp, msg);
        if (!hasErr) inp.focus();
        hasErr = true;
      }
    });
    if (hasErr) return;

    // UX loading
    btn.disabled = true;
    btn.classList.add('opacity-60', 'cursor-not-allowed');
    btn.textContent = 'Enviando…';

    try {
      const data = Object.fromEntries(new FormData(form).entries());
      data.telefone = data.telefone.replace(/\D+/g, '');

      const res = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.status);

      form.reset();
      toast('Mensagem enviada com sucesso! 🎉', true);
    } catch (err) {
      console.error(err);
      toast('Erro ao enviar. Tente novamente.', false);
    } finally {
      btn.disabled = false;
      btn.classList.remove('opacity-60', 'cursor-not-allowed');
      btn.textContent = 'Enviar mensagem';
    }
  });
});
