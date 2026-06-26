// ============================================================
// Split module for Escape Room: Giai cuu Alpha Corp.
// Loaded by index.html in order; no build step required.
// ============================================================

'use strict';

// ── Play door transition (GSAP) ───────────────────────────
function playDoorTransition(onDone) {
  var overlay = document.getElementById('door-transition');
  if (!overlay || typeof gsap === 'undefined') {
    onDone();
    return;
  }

  var isPres = state.isPresentationMode;
  var totalDur = isPres ? 0.65 : 1.1;

  overlay.classList.remove('hidden');

  var tl = gsap.timeline({
    onComplete: function () {
      overlay.classList.add('hidden');
      gsap.set([overlay, '.door-left', '.door-right', '.door-lock', '.lock-ring', '.lock-text'], { clearProps: 'all' });
      onDone();
    }
  });

  tl.set('.door-left', { xPercent: 0 })
    .set('.door-right', { xPercent: 0 })
    .set('.door-lock', { opacity: 0, scale: 0.6 })
    .set('.lock-text', { opacity: 0 })
    .to('.door-lock', {
      opacity: 1, scale: 1,
      duration: 0.2,
      ease: 'back.out(1.7)'
    }, 0.1)
    .to('.lock-ring', {
      rotation: 360,
      duration: isPres ? 0.3 : 0.5,
      ease: 'power2.inOut'
    }, 0.15)
    .to('.lock-text', {
      opacity: 1,
      duration: 0.15
    }, isPres ? 0.3 : 0.4)
    .to('.door-lock', {
      opacity: 0,
      duration: 0.12
    }, totalDur - 0.4)
    .to('.door-left', {
      xPercent: -100,
      duration: 0.4,
      ease: 'power3.in'
    }, totalDur - 0.4)
    .to('.door-right', {
      xPercent: 100,
      duration: 0.4,
      ease: 'power3.in'
    }, totalDur - 0.4);
}


// ── Particles ──────────────────────────────────────────────
let particles = [];
let canvas, ctx;
let animationId;
const BASE_PARTICLE_COUNT = 50;
const PRES_PARTICLE_COUNT = 20;

function initParticles() {
  canvas = document.getElementById('particles');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  resizeCanvas();
  createParticles();
  animateParticles();
  window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function getParticleCount() {
  return state.isPresentationMode ? PRES_PARTICLE_COUNT : BASE_PARTICLE_COUNT;
}

function createParticles() {
  const count = getParticleCount();
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * (canvas ? canvas.width : window.innerWidth),
      y: Math.random() * (canvas ? canvas.height : window.innerHeight),
      radius: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.3 + 0.1
    });
  }
}

function adjustParticles() {
  createParticles();
}

function animateParticles() {
  if (!ctx || !canvas) return;
  if (document.hidden) {
    animationId = requestAnimationFrame(animateParticles);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.speedX;
    p.y += p.speedY;

    // Bounce at edges
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(196, 154, 60, ${p.opacity})`;
    ctx.fill();
  }

  animationId = requestAnimationFrame(animateParticles);
}
