const projects = [
   {
    title: "WRO - Vision-Based Self-Driving Car",
    desc: "Autonomous car using computer vision for traffic sign detection and path planning.",
    tags: ["Python", "Raspberry Pi", "EKF", "Path Planning", "Computer Vision"],
    repo: "https://github.com/mahdzd/Self-Driving-Car",
    demo: "",
    image: "assets/projects/Car.jpeg"
    // photo: add a screenshot of detection overlay (assets/projects/vision.png)
  },
    {
  title: "Electric Wheelchair — CAD Design & Analysis",
  desc: "Front-wheel motorized wheelchair designed in SolidWorks with motion + stress analysis .",
  tags: ["SolidWorks", "CAD", "Motion Analysis", "FEA"],
  repo: "https://github.com/mahdzd/ElectricWheelChair",
  demo: "",
  image: "assets/projects/WheelChair.jpg"
  // image: add a clean render or exploded view (assets/projects/wheelchair.png)
  // best photos: 1) full render, 2) exploded view, 3) stress plot (optional)
},
{
    title: "VIP+ Solar Panel Cleaning — Instrumentation",
    desc: "Instrumentation plan for sensors + water recycling monitoring and integration.",
    tags: ["ESP32", "Sensors", "Instrumentation"],
    repo:"",
    demo: "",
    image: "assets/projects/VIP.png",
    
  },

  {
    title: "Furuta Pendulum — Modeling & Control",
    desc: "Nonlinear modeling, linearization, and state-space control with simulations.",
    tags: ["MATLAB/Simulink", "Control", "State-space"],
    repo: "https://github.com/mahdzd/inverted-Pendulum-Control",
    demo: "",
    image: "assets/projects/frutu.png"
    // photo: add a Simulink response plot or pendulum rig photo (assets/projects/furuta.png)
  },
  
  
  {
    title: "Ni-Cr Alloys — Literature Review",
    desc: "Biomedical-focused literature review and material property analysis.",
    tags: ["Materials", "Research", "Writing"],
    repo: "assets/papers/Ni-Cr Literature Review.pdf",
    demo: "",
    // photo: optional—cover page or a single summary figure (assets/projects/nicr.png)
  },
  {
    title: "AM Demodulator Receiver",
    desc: "Designed, simulated, and built an AM receiver for an electronics lab.",
    tags: ["Electronics", "SPICE", "Analog"],
    repo: "https://github.com/mahdzd/AM-Receiver",
    demo: "",
    // photo: add circuit schematic or breadboard build (assets/projects/am.png)
  },
  {
    title: "Magic Switching Logic Machine",
    desc: "Digital switching machine designed and built for logic design lab.",
    tags: ["Digital Logic", "Quartus", "FSM"],
    repo: "https://github.com/mahdzd/LogicDevice",
    demo: "",
    // photo: add FSM diagram or hardware demo shot (assets/projects/logic.png)
  },
  
  
];


const grid = document.getElementById("projectGrid");

projects.forEach(p => {
  const card = document.createElement("article");
  card.className = "card";

  const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join("");

  const repoBtn = p.repo
    ? `<a class="action" href="${p.repo}" target="_blank" rel="noreferrer">
         ${p.repo.endsWith(".pdf") ? "Read Paper" : "GitHub Repo"}
       </a>`
    : "";

  const demoBtn = p.demo
    ? `<a class="action" href="${p.demo}" target="_blank" rel="noreferrer">Live Demo</a>`
    : "";

  card.innerHTML = `
    ${p.image ? `<img class="thumb" src="${p.image}" alt="${p.title}">` : ""}
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
    <div class="tags">${tags}</div>
    <div class="actions">
      ${repoBtn}
      ${demoBtn}
    </div>
  `;

  grid.appendChild(card);
});

document.getElementById("year").textContent = new Date().getFullYear();

