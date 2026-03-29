/* ============================================
   ERGODICITY LIBRARY — Main JavaScript
   ============================================ */

// --- Brownian Motion Background Canvas ---
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h, particles, trails;
  const PARTICLE_COUNT = 60;
  const TRAIL_LENGTH = 40;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    trails = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      particles.push({ x, y, vx: 0, vy: 0, size: Math.random() * 1.5 + 0.5 });
      trails.push([{ x, y }]);
    }
  }

  function step() {
    const drift = 0.15;
    const vol = 1.8;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      // Brownian motion: drift + volatility * random
      p.vx = drift * (w / 2 - p.x) * 0.0001 + vol * (Math.random() - 0.5);
      p.vy = drift * (h / 2 - p.y) * 0.0001 + vol * (Math.random() - 0.5);
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      trails[i].push({ x: p.x, y: p.y });
      if (trails[i].length > TRAIL_LENGTH) trails[i].shift();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Draw trails
    for (let i = 0; i < trails.length; i++) {
      const trail = trails[i];
      if (trail.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      for (let j = 1; j < trail.length; j++) {
        // Don't draw line if it wraps around
        const dx = Math.abs(trail[j].x - trail[j - 1].x);
        const dy = Math.abs(trail[j].y - trail[j - 1].y);
        if (dx > 100 || dy > 100) {
          ctx.moveTo(trail[j].x, trail[j].y);
        } else {
          ctx.lineTo(trail[j].x, trail[j].y);
        }
      }
      const alpha = 0.04 + (i % 3) * 0.015;
      const hue = 190 + (i % 20) * 4;
      ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${alpha})`;
      ctx.lineWidth = particles[i].size;
      ctx.stroke();
    }

    // Draw connection lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.03 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.15)';
      ctx.fill();
    }
  }

  function loop() {
    step();
    draw();
    requestAnimationFrame(loop);
  }

  resize();
  createParticles();
  loop();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
})();

// --- Scroll Animations ---
(function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
})();

// --- Mobile Navigation ---
(function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const isOpen = links.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// --- Copy Install Command ---
(function initCopySnippet() {
  document.querySelectorAll('.install-snippet').forEach((el) => {
    el.addEventListener('click', () => {
      const text = 'pip install ergodicity-library';
      navigator.clipboard.writeText(text).then(() => {
        const icon = el.querySelector('.copy-icon');
        if (icon) {
          icon.textContent = '✓';
          setTimeout(() => { icon.textContent = '⧉'; }, 1500);
        }
      });
    });
  });
})();

// --- Nav scroll background ---
(function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.background = 'rgba(6, 6, 17, 0.92)';
    } else {
      nav.style.background = 'rgba(6, 6, 17, 0.75)';
    }
  });
})();
