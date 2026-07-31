const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18);
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navLinks?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navLinks.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    navLinks?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

document.querySelectorAll('[data-terminal-type]').forEach((line) => {
  const output = line.querySelector('.terminal-output');
  if (!output || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const message = output.textContent.trim();
  output.textContent = '';
  line.classList.add('is-typing');
  let cursor = 0;

  const typeNext = () => {
    output.textContent = message.slice(0, cursor);
    cursor += 1;
    if (cursor <= message.length) window.setTimeout(typeNext, 11);
    else line.classList.remove('is-typing');
  };

  window.setTimeout(typeNext, 260);
});

window.createProjectCard = function createProjectCard(project) {
  const stack = project.stack.slice(0, 4).map((item) => `<span class="tag">${item}</span>`).join('');
  return `
    <a class="project-card reveal visible" data-tilt data-category="${project.category}" href="/projects/${project.slug}" style="--card-accent:${project.accent}">
      <span class="project-number" aria-hidden="true">${project.symbol}</span>
      <div class="project-top">
        <span class="project-category">${project.category}</span>
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
      </div>
      <div class="project-bottom">
        <div class="tag-list">${stack}</div>
        <span class="round-arrow" aria-hidden="true">↗</span>
      </div>
    </a>`;
};

window.enableCardTilt = function enableCardTilt() {
  // Project cards use a restrained border and shadow hover treatment.
};
