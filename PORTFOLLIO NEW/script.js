/* ===== EDIT THESE ===== */
const CONFIG = {
  email: "aec.cse.2024soumajitchakraborty@gmail.com",
  phone: "+919800083697",
  github: "Soumajit1",
  linkedin: "https://linkedin.com/in/soumajit-chakraborty-aec",
  leetcode: "https://leetcode.com/u/SoumajitC9/",
  links: {
    "agrilink-live": "https://agrilink-sih-1pjn.onrender.com/",
    "scholarship-live": "https://unified-scholarship-mobile-application.onrender.com/login",
    "cert-oracle": "https://mylearn.oracle.com/ou/learning-path/become-an-oci-ai-foundations-associate-2025/147781",
    "cert-udemy-python": "https://www.udemy.com/certificate/UC-bcdcc119-986f-426d-a8fe-b24a40b96219/",
    "cert-arcade": "https://www.skills.google/public_profiles/9ee8ea76-d8c0-4d35-8f70-30899201d3f4",
    "cert-udemy-web": "https://www.udemy.com/certificate/UC-7fd69619-a935-4c7e-95d1-35cebc2690d5/"
  }
};
/* ====================== */

// ---- wire up links ----
document.querySelectorAll("[data-link]").forEach(a => {
  const k = a.dataset.link;
  if (k === "github") a.href = "https://github.com/" + CONFIG.github;
  else if (k === "linkedin") a.href = CONFIG.linkedin;
  else if (k === "leetcode") a.href = CONFIG.leetcode;
  else if (k === "phone") a.href = "tel:" + CONFIG.phone;
  else if (k === "email") { a.href = "mailto:" + CONFIG.email; if (a.classList.contains("btn")) a.textContent = "Email: " + CONFIG.email; }
  else if (CONFIG.links[k]) a.href = CONFIG.links[k];
});
document.getElementById("ghGraph").src = "https://ghchart.rshah.org/2F5D50/" + CONFIG.github;

// ---- loader ----
(function () {
  const loader = document.getElementById("loader"), pct = document.getElementById("loader-pct");
  let n = 0;
  const t = setInterval(() => {
    n = Math.min(100, n + Math.ceil(Math.random() * 14));
    pct.textContent = n + "%";
    if (n >= 100) { clearInterval(t); setTimeout(() => loader.classList.add("done"), 200); }
  }, 70);
})();

// ---- scroll progress + active nav ----
const bar = document.getElementById("progress");
const links = [...document.querySelectorAll("#navLinks a")];
const sections = links.map(a => document.querySelector(a.getAttribute("href")));
addEventListener("scroll", () => {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
  let cur = 0;
  sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < 140) cur = i; });
  links.forEach((a, i) => a.classList.toggle("active", i === cur));
}, { passive: true });

// ---- mobile menu ----
const menuBtn = document.getElementById("menuBtn"), navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", () => navLinks.classList.remove("open"));

// ---- IST clock ----
const clock = document.getElementById("clock");
function tick() {
  const t = new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour12: false });
  clock.textContent = "ASANSOL · " + t + " IST";
}
tick(); setInterval(tick, 1000);

// ---- command palette ----
const palette = document.getElementById("palette"), pInput = document.getElementById("paletteInput"), pList = document.getElementById("paletteList");
const items = links.map(a => ({ label: a.textContent, href: a.getAttribute("href") }))
  .concat([{ label: "Resume (PDF)", href: "assets/Resume.pdf" }]);
let sel = 0, shown = items;
function renderPalette() {
  const q = pInput.value.toLowerCase();
  shown = items.filter(i => i.label.toLowerCase().includes(q));
  sel = Math.min(sel, Math.max(0, shown.length - 1));
  pList.innerHTML = shown.map((i, n) => `<li class="${n === sel ? "sel" : ""}" data-n="${n}">${i.label}</li>`).join("");
}
function openPalette() { palette.hidden = false; pInput.value = ""; sel = 0; renderPalette(); pInput.focus(); }
function closePalette() { palette.hidden = true; }
function go(i) { if (!i) return; closePalette(); if (i.href.startsWith("#")) location.hash = i.href; else window.open(i.href, "_blank"); }
pInput.addEventListener("input", () => { sel = 0; renderPalette(); });
pList.addEventListener("click", e => { const li = e.target.closest("li"); if (li) go(shown[li.dataset.n]); });
palette.addEventListener("click", e => { if (e.target === palette) closePalette(); });
document.getElementById("paletteBtn").addEventListener("click", openPalette);
addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); palette.hidden ? openPalette() : closePalette(); return; }
  if (palette.hidden) return;
  if (e.key === "Escape") closePalette();
  else if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % shown.length; renderPalette(); }
  else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + shown.length) % shown.length; renderPalette(); }
  else if (e.key === "Enter") go(shown[sel]);
});

// ---- terminal contact form ----
(function () {
  const body = document.getElementById("termBody");
  const data = {};
  const steps = [
    { key: "type", q: "WHAT KIND OF CONVERSATION IS THIS?", opts: ["Project", "Internship / Job", "Collab", "Something else"] },
    { key: "name", q: "WHAT IS YOUR NAME?", input: "text" },
    { key: "focus", q: "PRIMARY FOCUS AREA?", opts: ["Frontend", "Full-stack", "Backend", "Cloud / DevOps"] },
    { key: "msg", q: "BRIEF MISSION DESCRIPTION:", input: "textarea" },
    { key: "email", q: "YOUR EMAIL ADDRESS:", input: "email" }
  ];
  const line = (html, cls = "") => { const d = document.createElement("div"); d.className = "t-line " + cls; d.innerHTML = html; body.appendChild(d); return d; };
  const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function start() {
    body.innerHTML = ""; Object.keys(data).forEach(k => delete data[k]);
    line('<span class="t-prompt">GUEST@SOUMAJIT:~$</span> INIT-COLLAB');
    ask(0);
  }
  function ask(i) {
    if (i >= steps.length) return finish();
    const s = steps[i];
    line("[?] " + s.q, "t-q");
    const wrap = document.createElement("div");
    if (s.opts) {
      wrap.className = "t-opts";
      s.opts.forEach(o => {
        const b = document.createElement("button"); b.type = "button"; b.textContent = o;
        b.onclick = () => { data[s.key] = o; wrap.remove(); line("> " + esc(o)); ask(i + 1); };
        wrap.appendChild(b);
      });
    } else {
      wrap.className = "t-input";
      const f = document.createElement(s.input === "textarea" ? "textarea" : "input");
      if (s.input !== "textarea") f.type = s.input; else f.rows = 3;
      f.setAttribute("aria-label", s.q);
      const b = document.createElement("button"); b.type = "button"; b.textContent = "Enter";
      const err = document.createElement("div"); err.className = "t-err";
      const submit = () => {
        const v = f.value.trim();
        if (!v) { err.textContent = "This field is required."; return; }
        if (s.input === "email" && !/^\S+@\S+\.\S+$/.test(v)) { err.textContent = "Enter a valid email address."; return; }
        data[s.key] = v; wrap.remove(); err.remove(); line("> " + esc(v)); ask(i + 1);
      };
      b.onclick = submit;
      f.addEventListener("keydown", e => { if (e.key === "Enter" && (s.input !== "textarea" || e.ctrlKey)) { e.preventDefault(); submit(); } });
      wrap.append(f, b); wrap.after && null;
      body.appendChild(wrap); body.appendChild(err);
      setTimeout(() => f.focus(), 0);
    }
    if (s.opts) body.appendChild(wrap);
  }
  function finish() {
    line("PACKAGING MISSION…", "t-prompt");
    const subject = encodeURIComponent(`[${data.type}] ${data.name} — ${data.focus}`);
    const text = encodeURIComponent(`${data.msg}\n\nFrom: ${data.name}\nReply to: ${data.email}\nFocus: ${data.focus}`);
    const btn = document.createElement("a");
    btn.className = "t-send"; btn.style.cssText = "display:inline-block;margin-top:.8rem;text-decoration:none";
    btn.href = `mailto:${CONFIG.email}?subject=${subject}&body=${text}`;
    btn.textContent = "Send mission";
    body.appendChild(btn);
    const again = document.createElement("button");
    again.className = "t-send"; again.type = "button"; again.textContent = "Start over";
    again.style.cssText = "margin-left:.6rem;background:transparent;color:#d9e6df;border:1px solid #3b4a42";
    again.onclick = start; body.appendChild(again);
  }
  start();
})();
