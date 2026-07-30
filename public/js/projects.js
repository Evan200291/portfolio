const grid = document.querySelector('#projects-grid');
const filters = document.querySelector('#project-filters');
let projects = [];

async function loadProjects() {
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) throw new Error('Unable to load projects.');
    ({ projects } = await response.json());
    renderProjects('All');
    renderFilters();
  } catch (error) {
    grid.innerHTML = `<div class="empty-state">${error.message} Please refresh the page.</div>`;
  }
}

function renderProjects(category) {
  const visible = category === 'All' ? projects : projects.filter((project) => project.category === category);
  grid.innerHTML = visible.map(window.createProjectCard).join('');
  window.enableCardTilt();
}

function renderFilters() {
  const categories = ['All', ...new Set(projects.map((project) => project.category))];
  filters.innerHTML = categories.map((category, index) => `
    <button class="filter-button ${index === 0 ? 'active' : ''}" type="button" data-filter="${category}">${category}</button>
  `).join('');

  filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    filters.querySelectorAll('button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderProjects(button.dataset.filter);
  });
}

loadProjects();
