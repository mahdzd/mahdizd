// ============================================================
// DATA
// ============================================================
const projects = [
  {
    title: "WRO — Vision-Based Self-Driving Car",
    desc: "Built a 4-wheel autonomous car for the World Robot Olympiad using computer vision for traffic sign detection, Extended Kalman Filter for localization, and advanced path planning algorithms.",
    tags: ["Python", "Raspberry Pi", "EKF", "Computer Vision", "Path Planning"],
    cats: ["robotics", "software"],
    repo: "https://github.com/mahdzd/Self-Driving-Car",
    image: "assets/projects/Car.jpeg",
    icon: "🚗"
  },
  {
    title: "Electric Wheelchair — CAD Design & Analysis",
    desc: "Developed a front-wheel drive motorized wheelchair prototype emphasizing user accessibility. Conducted CAD modeling, motion simulation, and stress analysis using SolidWorks and FEA tools.",
    tags: ["SolidWorks", "CAD", "FEA", "Motion Analysis"],
    cats: ["cad"],
    repo: "https://github.com/mahdzd/ElectricWheelChair",
    image: "assets/projects/WheelChair.jpg",
    icon: "♿"
  },
  {
    title: "VIP+ Solar Panel Cleaning System",
    desc: "Designed a solar-panel cleaning system with the LAU Industrial Hub. Developed instrumentation using pressure, flow, and TDS sensors with ESP32-based control.",
    tags: ["ESP32", "Sensors", "Instrumentation", "IoT"],
    cats: ["robotics", "electronics"],
    image: "assets/projects/VIP.png",
    icon: "☀️"
  },
  {
    title: "Furuta Pendulum — Modeling & Control",
    desc: "Nonlinear modeling, linearization, and state-space control design for the Furuta pendulum, with full MATLAB/Simulink simulations and stability analysis.",
    tags: ["MATLAB", "Simulink", "Control Theory", "State-Space"],
    cats: ["software"],
    repo: "https://github.com/mahdzd/inverted-Pendulum-Control",
    image: "assets/projects/frutu.png",
    icon: "🔄"
  },
  {
    title: "Ni-Cr Alloys — Literature Review",
    desc: "Comprehensive biomedical-focused literature review and material property analysis of Nickel-Chromium alloys, covering microstructure, corrosion resistance, and mechanical properties.",
    tags: ["Materials Science", "Research", "Technical Writing"],
    cats: ["software"],
    repo: "assets/papers/Ni-Cr Literature Review.pdf",
    icon: "🔬"
  },
  {
    title: "AM Demodulator Receiver",
    desc: "Designed, simulated in SPICE, and physically built an AM radio receiver circuit. Complete signal chain from antenna coupling to envelope detection and audio output.",
    tags: ["Electronics", "SPICE", "Analog Circuits", "RF"],
    cats: ["electronics"],
    repo: "https://github.com/mahdzd/AM-Receiver",
    icon: "📻"
  },
  {
    title: "Magic Switching Logic Machine",
    desc: "Designed and implemented a digital switching machine using finite state machine (FSM) logic in Quartus. Built and tested the hardware implementation for a digital logic lab.",
    tags: ["Digital Logic", "Quartus", "FSM", "FPGA"],
    cats: ["electronics"],
    repo: "https://github.com/mahdzd/LogicDevice",
    icon: "💡"
  }
];

// ============================================================
// PARTICLE CANVAS
// ============================================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let pts = [];

function resizeCanvas() {
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
}

function initPts() {
  pts = [];
  const n = Math.floor((canvas.width * canvas.height) / 13000);
  for (let i = 0; i < n; i++) {
    pts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      a: Math.random() * 0.5 + 0.15
    });
  }
}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    for (let j = i + 1; j < pts.length; j++) {
      const q = pts[j];
      const dx = p.x - q.x, dy = p.y - q.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 130) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(91,156,246,${0.14 * (1 - d / 130)})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(91,156,246,${p.a})`;
    ctx.fill();
  }
  requestAnimationFrame(tick);
}

resizeCanvas();
initPts();
tick();
window.addEventListener('resize', () => { resizeCanvas(); initPts(); });

// ============================================================
// TYPING EFFECT
// ============================================================
const roles = [
  'Robotics Systems',
  'Control Algorithms',
  'Mechatronic Devices',
  'Research Projects',
  'Embedded Systems'
];
let ri = 0, ci = 0, erasing = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  const word = roles[ri];
  if (!erasing) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { erasing = true; return setTimeout(typeLoop, 1900); }
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) { erasing = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeLoop, erasing ? 44 : 76);
}
typeLoop();

// ============================================================
// STAT COUNTERS
// ============================================================
let countersDone = false;
function runCounters() {
  if (countersDone) return;
  countersDone = true;
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const dec = parseInt(el.dataset.dec || 0);
    const suf = el.dataset.suf || '';
    const dur = 1400;
    const t0 = performance.now();
    function step(now) {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = (e * target).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(dec) + suf;
    }
    requestAnimationFrame(step);
  });
}

// ============================================================
// PROJECT CARDS
// ============================================================
const grid = document.getElementById('projectGrid');

function buildCard(p) {
  const card = document.createElement('article');
  card.className = 'proj-card reveal';
  card.dataset.cats = (p.cats || []).join(' ');
  card.tabIndex = 0;

  const media = p.image
    ? `<div class="proj-img-wrap"><img class="proj-img" src="${p.image}" alt="${p.title}" loading="lazy"></div>`
    : `<div class="proj-placeholder">${p.icon || '🔧'}</div>`;

  const tags = (p.tags || []).map(t => `<span class="proj-tag">${t}</span>`).join('');

  card.innerHTML = `
    ${media}
    <div class="proj-body">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="proj-tags">${tags}</div>
    </div>`;

  card.addEventListener('click', () => openModal(p));
  card.addEventListener('keydown', e => { if (e.key === 'Enter') openModal(p); });
  return card;
}

function renderProjects() {
  grid.innerHTML = '';
  projects.forEach(p => grid.appendChild(buildCard(p)));
  initReveal();
}

// Filter
document.getElementById('filterRow').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  document.querySelectorAll('.proj-card').forEach(c => {
    c.classList.toggle('hidden', f !== 'all' && !c.dataset.cats.includes(f));
  });
});

// ============================================================
// MODAL
// ============================================================
const modal = document.getElementById('projectModal');

function openModal(p) {
  const mediaEl = document.getElementById('modalMedia');
  if (p.image) {
    mediaEl.innerHTML = `<img src="${p.image}" alt="${p.title}" style="width:100%;height:100%;min-height:360px;object-fit:cover;display:block">`;
  } else {
    mediaEl.innerHTML = `<div class="modal-placeholder">${p.icon || '🔧'}</div>`;
  }
  document.getElementById('modalTags').innerHTML =
    (p.tags || []).map(t => `<span class="chip">${t}</span>`).join('');
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalDesc').textContent = p.desc;

  const linksEl = document.getElementById('modalLinks');
  linksEl.innerHTML = '';
  if (p.repo) {
    const isPdf = p.repo.endsWith('.pdf');
    linksEl.innerHTML += `<a class="m-link m-link-p" href="${p.repo}" target="_blank" rel="noreferrer">${isPdf ? '📄 Read Paper' : '💻 View on GitHub'}</a>`;
  }
  if (p.demo) {
    linksEl.innerHTML += `<a class="m-link m-link-s" href="${p.demo}" target="_blank" rel="noreferrer">🔗 Live Demo</a>`;
  }

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalScrim').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ============================================================
// NAVBAR
// ============================================================
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');

document.getElementById('menuToggle').addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============================================================
// THEME
// ============================================================
const themeBtn = document.getElementById('themeToggle');

function applyTheme() {
  const light = localStorage.getItem('theme') === 'light';
  document.documentElement.classList.toggle('light', light);
  themeBtn.textContent = light ? '☀️' : '🌙';
}
themeBtn.addEventListener('click', () => {
  const willBeLight = !document.documentElement.classList.contains('light');
  localStorage.setItem('theme', willBeLight ? 'light' : 'dark');
  applyTheme();
});
applyTheme();

// ============================================================
// SCROLL — progress, navbar, counters
// ============================================================
const progressBar = document.getElementById('scrollProgress');
const statsEl = document.querySelector('.stats-band');

window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (window.scrollY / total * 100) + '%';

  navbar.classList.toggle('scrolled', window.scrollY > 20);

  if (statsEl && statsEl.getBoundingClientRect().top < window.innerHeight * 0.92) {
    runCounters();
  }
}, { passive: true });

// ============================================================
// REVEAL ON SCROLL
// ============================================================
function initReveal() {
  const items = document.querySelectorAll('.reveal:not(.visible)');
  if (!items.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, idx) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), idx * 60);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  items.forEach(el => obs.observe(el));
}

// ============================================================
// INIT
// ============================================================
renderProjects();
initReveal();
document.getElementById('year').textContent = new Date().getFullYear();
