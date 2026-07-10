/* ============================================
   PlayStation 4 Tribute — Interactivity
   ============================================ */

/* ---------- Loading screen ---------- */
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("loader").classList.add("hidden"), 900);
});

/* ---------- Year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Sound (simple beep synth) ---------- */
let soundOn = false;
let audioCtx;
function beep(freq = 440, duration = 0.08, type = "sine", vol = 0.05) {
  if (!soundOn) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.value = vol;
    o.connect(g).connect(audioCtx.destination);
    o.start();
    setTimeout(() => { o.stop(); }, duration * 1000);
  } catch (e) {}
}
document.getElementById("soundToggle").addEventListener("click", (e) => {
  soundOn = !soundOn;
  e.currentTarget.textContent = soundOn ? "🔊" : "🔇";
  e.currentTarget.setAttribute("aria-pressed", soundOn);
  if (soundOn) beep(660, 0.1);
});
document.addEventListener("click", (e) => {
  if (e.target.closest("button, a")) beep(520, 0.05, "square", 0.03);
});

/* ---------- Theme toggle ---------- */
const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("light");
  themeBtn.textContent = document.documentElement.classList.contains("light") ? "☀️" : "🌙";
});

/* ---------- Mobile menu ---------- */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

/* ---------- Smooth-scroll button ---------- */
document.querySelectorAll("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

/* ---------- Scroll progress + to-top + nav active ---------- */
const progress = document.getElementById("progress");
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = pct + "%";
  toTop.classList.toggle("visible", h.scrollTop > 500);
});
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add("visible"));
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* ---------- Animated stat counters ---------- */
const statIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    let cur = 0;
    const step = Math.max(1, Math.round(target / 60));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = cur.toLocaleString() + (target >= 100 ? "+" : "");
    }, 25);
    statIO.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll(".num").forEach(n => statIO.observe(n));

/* ---------- Particles ---------- */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
function sizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
sizeCanvas();
window.addEventListener("resize", sizeCanvas);
for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.4,
    vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
    a: Math.random() * 0.5 + 0.2
  });
}
function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.fillStyle = `rgba(76,201,255,${p.a})`;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(tick);
}
tick();

/* ---------- Games ---------- */
const games = [
  { title: "Marvel's Spider-Man", year: 2018, color: "#c8102e",
    desc: "Insomniac's open-world Spider-Man features fluid web-swinging, a heartfelt Peter Parker story, and a beautifully realised Manhattan." },
  { title: "God of War", year: 2018, color: "#a67c00",
    desc: "Kratos returns in a mythic Norse adventure with his son Atreus. A cinematic single-take camera and brutal combat redefined the series." },
  { title: "Ghost of Tsushima", year: 2020, color: "#7a1f2a",
    desc: "Sucker Punch's samurai epic set on feudal Japan's Tsushima island — one of the most visually breathtaking games on PS4." },
  { title: "Horizon Zero Dawn", year: 2017, color: "#e07b00",
    desc: "Aloy hunts colossal machines in a lush post-apocalyptic world. A stunning debut for Guerrilla's new franchise." },
  { title: "Bloodborne", year: 2015, color: "#3a0d0d",
    desc: "FromSoftware's gothic action-RPG in the plagued city of Yharnam. Fast, brutal, and famously atmospheric." },
  { title: "The Last of Us Part II", year: 2020, color: "#2b3a2f",
    desc: "Naughty Dog's harrowing sequel about revenge and forgiveness. Astonishing performances and cinematic craftsmanship." },
  { title: "Uncharted 4", year: 2016, color: "#5c3a1e",
    desc: "Nathan Drake's final adventure. Globe-trotting set-pieces, lifelike characters, and one of the PS4's most polished experiences." },
  { title: "Gran Turismo Sport", year: 2017, color: "#0a3d91",
    desc: "Polyphony Digital's realistic driving simulator with online-focused competitive racing and gorgeous cars." },
];
const gameGrid = document.getElementById("gameGrid");
games.forEach((g, i) => {
  const card = document.createElement("div");
  card.className = "game-card";
  card.innerHTML = `
    <div class="cover" style="background: linear-gradient(135deg, ${g.color}, #05060a);"></div>
    <div class="meta"><h4>${g.title}</h4><small>${g.year}</small></div>`;
  card.addEventListener("click", () => openModal(`
    <div class="modal-cover" style="background: linear-gradient(135deg, ${g.color}, #05060a);"></div>
    <h3>${g.title}</h3>
    <p><strong>Released:</strong> ${g.year}</p>
    <p>${g.desc}</p>`));
  gameGrid.appendChild(card);
});

/* ---------- Gallery ---------- */
const galleryColors = ["#0a1a3d", "#1a0d3a", "#3a0d1e", "#0d3a2c", "#3a2c0d", "#1d0d3a", "#0d2c3a", "#2c3a0d"];
const galleryGrid = document.getElementById("galleryGrid");
galleryColors.forEach((c, i) => {
  const item = document.createElement("div");
  item.className = "gallery-item";
  const cover = `linear-gradient(135deg, ${c}, #05060a), radial-gradient(circle at 30% 30%, rgba(76,201,255,.3), transparent 60%)`;
  item.innerHTML = `<div class="cover" style="background: ${cover};"></div>`;
  item.addEventListener("click", () => openModal(`
    <div class="modal-cover" style="background: ${cover};"></div>
    <h3>PS4 Image ${i + 1}</h3>
    <p>Concept image for the PlayStation 4 gallery.</p>`));
  galleryGrid.appendChild(item);
});

/* ---------- Timeline ---------- */
const timelineItems = [
  { year: 2013, event: "PlayStation 4 launches in North America (Nov 15) — sells 1M units in 24 hours." },
  { year: 2014, event: "Global rollout continues. Bloodborne, Destiny and inFAMOUS: Second Son define early PS4." },
  { year: 2015, event: "Bloodborne released. PS4 becomes fastest-selling home console in US history." },
  { year: 2016, event: "PS4 Slim and PS4 Pro launch. PlayStation VR arrives October 13." },
  { year: 2017, event: "Horizon Zero Dawn and Gran Turismo Sport release to critical acclaim." },
  { year: 2018, event: "God of War and Marvel's Spider-Man become record-breaking exclusives." },
  { year: 2019, event: "Days Gone and Death Stranding round out the PS4 exclusive lineup." },
  { year: 2020, event: "The Last of Us Part II & Ghost of Tsushima release. PS5 launches Nov 12." },
];
const timeline = document.getElementById("timeline");
timelineItems.forEach(t => {
  const li = document.createElement("li");
  li.innerHTML = `<span class="dot"></span><div class="year">${t.year}</div><div class="event">${t.event}</div>`;
  timeline.appendChild(li);
});

/* ---------- Quiz ---------- */
const quizData = [
  { q: "When was the PlayStation 4 released in North America?",
    a: ["November 15, 2013", "December 3, 2013", "October 1, 2014", "November 15, 2012"], c: 0 },
  { q: "Who develops the PS4?", a: ["Microsoft", "Sony Interactive Entertainment", "Nintendo", "Sega"], c: 1 },
  { q: "Which PS4 model supports 4K checkerboard rendering?",
    a: ["Original PS4", "PS4 Slim", "PS4 Pro", "All models"], c: 2 },
  { q: "Which game is developed by FromSoftware exclusively for PS4?",
    a: ["Ghost of Tsushima", "God of War", "Bloodborne", "Horizon Zero Dawn"], c: 2 },
  { q: "What is the GPU power of the original PS4?",
    a: ["1.84 TFLOPS", "4.2 TFLOPS", "6 TFLOPS", "12 TFLOPS"], c: 0 },
  { q: "Which studio made Horizon Zero Dawn?",
    a: ["Naughty Dog", "Guerrilla Games", "Sucker Punch", "Insomniac"], c: 1 },
  { q: "Which PS4 accessory brings virtual reality?",
    a: ["PS Move", "PS VR", "PS Camera", "DualSense"], c: 1 },
  { q: "When did the PS4 Pro launch?",
    a: ["2015", "2016", "2017", "2018"], c: 1 },
  { q: "Which feature lets a friend virtually take your controller online?",
    a: ["Remote Play", "Share Play", "Broadcast", "Party Chat"], c: 1 },
  { q: "How many PS4 units have been sold worldwide (approx)?",
    a: ["60 million", "80 million", "117 million", "155 million"], c: 2 },
];
let qIndex = 0, qScore = 0;
const quizBody = document.getElementById("quizBody");
const quizProgress = document.getElementById("quizProgress");
const quizRestart = document.getElementById("quizRestart");

function renderQuiz() {
  if (qIndex >= quizData.length) return renderResult();
  const q = quizData[qIndex];
  quizProgress.textContent = `Question ${qIndex + 1} / ${quizData.length}  ·  Score: ${qScore}`;
  quizRestart.hidden = true;
  quizBody.innerHTML = `
    <p class="q-question">${qIndex + 1}. ${q.q}</p>
    <div class="q-options">
      ${q.a.map((opt, i) => `<button class="q-opt" data-i="${i}">${opt}</button>`).join("")}
    </div>`;
  quizBody.querySelectorAll(".q-opt").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = +btn.dataset.i;
      const correct = i === q.c;
      btn.classList.add(correct ? "correct" : "wrong");
      if (!correct) quizBody.querySelector(`.q-opt[data-i="${q.c}"]`).classList.add("correct");
      if (correct) qScore++;
      quizBody.querySelectorAll(".q-opt").forEach(b => b.disabled = true);
      beep(correct ? 880 : 220, 0.15, correct ? "sine" : "sawtooth", 0.05);
      setTimeout(() => { qIndex++; renderQuiz(); }, 900);
    });
  });
}
function renderResult() {
  const pass = qScore >= 8;
  quizProgress.textContent = "";
  quizRestart.hidden = false;
  quizBody.innerHTML = `
    <div class="quiz-result">
      ${pass ? '<div class="trophy">🏆</div>' : '<div style="font-size:72px">🎮</div>'}
      <h3>${pass ? "Platinum Trophy!" : "Nice try!"}</h3>
      <p>You scored <strong>${qScore} / ${quizData.length}</strong>.</p>
      <p>${pass ? "You truly know your PlayStation history." : "Give it another shot to earn the trophy!"}</p>
    </div>`;
}
quizRestart.addEventListener("click", () => { qIndex = 0; qScore = 0; renderQuiz(); });
renderQuiz();

/* ---------- Fun facts ---------- */
const facts = [
  "The PS4 sold 1 million units in its first 24 hours in North America.",
  "The PS4's codename during development was 'Orbis'.",
  "The DualShock 4 controller was the first PlayStation controller with a touchpad.",
  "PS4 has sold over 117 million units, making it the second-best selling home console ever.",
  "Bloodborne (2015) was directed by Hidetaka Miyazaki, creator of the Souls series.",
  "The PS4 Pro supports 4K checkerboard rendering and HDR output.",
  "Share Play lets a friend play your game online — even if they don't own it.",
  "The PS4 was the first PlayStation to include an x86-64 CPU (AMD Jaguar).",
  "PlayStation VR launched in October 2016 and sold over 5 million units by 2020.",
  "God of War (2018) won more than 200 Game of the Year awards.",
  "Ghost of Tsushima's black-and-white 'Kurosawa Mode' pays tribute to samurai cinema.",
  "The PS4's Blu-ray drive supports 25 GB single-layer and 50 GB dual-layer discs.",
];
const factBtn = document.getElementById("factBtn");
const factText = document.getElementById("factText");
factBtn.addEventListener("click", () => {
  let f; do { f = facts[Math.floor(Math.random() * facts.length)]; } while (f === factText.textContent);
  factText.style.opacity = 0;
  setTimeout(() => { factText.textContent = f; factText.style.opacity = 1; }, 200);
});

/* ---------- Contact form ---------- */
const contactForm = document.getElementById("contactForm");
const contactMsg = document.getElementById("contactMsg");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  contactMsg.textContent = "✅ Thanks! Your message has been sent.";
  contactForm.reset();
  setTimeout(() => contactMsg.textContent = "", 4000);
});

/* ---------- Modal ---------- */
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
function openModal(html) {
  modalContent.innerHTML = html;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const y = window.scrollY + 100;
  sections.forEach(s => {
    const link = document.querySelector(`.nav-links a[href="#${s.id}"]`);
    if (!link) return;
    if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
      document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
      link.classList.add("active");
    }
  });
});
