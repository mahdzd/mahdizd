const projects = [
  {
    title: "Furuta Pendulum — Modeling & Control",
    desc: "Nonlinear model, linearization, state-space control, simulation and implementation notes.",
    tags: ["MATLAB/Simulink", "State-space", "Control"],
    repo: "https://github.com/YOUR_GITHUB/YOUR_REPO",
    demo: ""
  },
  {
    title: "Raspberry Pi Vision — Traffic Sign Detection",
    desc: "HSV segmentation + tracking + geometry calibration using picamera2.",
    tags: ["Python", "Raspberry Pi", "Computer Vision"],
    repo: "https://github.com/YOUR_GITHUB/YOUR_REPO",
    demo: ""
  },
  {
    title: "VIP+ Solar Panel Cleaning — Instrumentation",
    desc: "Sensor suite + water recycling instrumentation concept and integration plan.",
    tags: ["ESP32", "Sensors", "Instrumentation"],
    repo: "https://github.com/YOUR_GITHUB/YOUR_REPO",
    demo: ""
  },
];

const grid = document.getElementById("projectGrid");

projects.forEach(p => {
  const card = document.createElement("article");
  card.className = "card";

  const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join("");

  const demoBtn = p.demo
    ? `<a class="action" href="${p.demo}" target="_blank" rel="noreferrer">Live Demo</a>`
    : "";

  card.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
    <div class="tags">${tags}</div>
    <div class="actions">
      <a class="action" href="${p.repo}" target="_blank" rel="noreferrer">GitHub Repo</a>
      ${demoBtn}
    </div>
  `;

  grid.appendChild(card);
});

document.getElementById("year").textContent = new Date().getFullYear();
