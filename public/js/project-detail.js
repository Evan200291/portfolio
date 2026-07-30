const root = document.querySelector('#project-detail');
const slug = location.pathname.split('/').filter(Boolean).pop();

async function loadProject() {
  try {
    const response = await fetch(`/api/projects/${encodeURIComponent(slug)}`);
    if (!response.ok) throw new Error('Project not found.');
    const { project } = await response.json();
    document.title = `${project.title} | Ent Hmue Maung`;
    root.style.setProperty('--project-accent', project.accent);
    const liveProjectLink = project.liveUrl
      ? `<a class="button button-ghost project-live-link" href="${project.liveUrl}" target="_blank" rel="noreferrer">Visit live site <span>&nearr;</span></a>`
      : '';
    root.innerHTML = `
      <section class="project-hero">
        <div class="container project-hero-grid">
          <div>
            <a class="project-back" href="/projects" aria-label="Return to all projects"><span aria-hidden="true">←</span> Back to projects</a>
            <p class="eyebrow">${project.eyebrow}</p>
            <h1 class="project-title">${project.title}</h1>
            <p class="project-summary">${project.summary}</p>
          </div>
          <div class="project-orbit" aria-hidden="true"><span>${project.symbol}</span></div>
        </div>
      </section>
      <section class="section-compact">
        <div class="container project-body">
          <dl class="project-facts">
            <div class="fact"><dt>Period</dt><dd>${project.period}</dd></div>
            <div class="fact"><dt>Discipline</dt><dd>${project.category}</dd></div>
            <div class="fact"><dt>Tools</dt><dd><div class="tag-list">${project.stack.map((item) => `<span class="tag">${item}</span>`).join('')}</div></dd></div>
          </dl>
          <div>
            <div class="content-block">
              <p class="eyebrow">The work</p>
              <h2>Building for measurable reliability.</h2>
              <p>${project.description}</p>
            </div>
            <div class="content-block">
              <p class="eyebrow">Key outcomes</p>
              <h2>What the project delivered.</h2>
              <ul class="impact-list">${project.impact.map((item) => `<li>${item}</li>`).join('')}</ul>
              ${liveProjectLink}
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container project-archive-cta">
          <div><p class="eyebrow">Next case study</p><h2 class="section-title">Explore the complete project archive.</h2></div>
          <a class="button button-primary" href="/projects">All projects <span>↗</span></a>
        </div>
      </section>`;
  } catch (error) {
    root.innerHTML = `<section class="page-hero"><div class="container"><p class="eyebrow">404</p><h1 class="section-title">${error.message}</h1><p class="lead">The case study may have moved.</p><a class="button button-primary" href="/projects">View all projects</a></div></section>`;
  }
}

loadProject();
