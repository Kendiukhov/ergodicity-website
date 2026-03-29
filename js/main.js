const page = document.body.dataset.page || "home";
const root = document.body.dataset.root || "";

const internalLinks = {
  home: root || "./",
  about: `${root}about-the-library/`,
  bookIntro: `${root}ergodicity-library-an-introduction/`,
  bookAdventures: `${root}adventures-in-ergodicity-economics/`,
  videos: `${root}videos/`,
  plots: `${root}plots/`,
  interactive: `${root}interactive/`,
  education: `${root}education/`,
  research: `${root}research/`,
  ergodicitygpt: `${root}ergodicitygpt/`,
  tutorials: `${root}video-tutorials/`,
  blog: `${root}blog/`,
  projects: `${root}projects/`,
  development: `${root}development/`,
  author: `${root}about-the-author/`,
  postIntro: `${root}post/introducing-ergodicity-library/`,
};

const menuSections = [
  {
    title: "Overview",
    links: [
      { id: "home", label: "Home", href: internalLinks.home },
      { id: "about", label: "About the Library", href: internalLinks.about },
    ],
  },
  {
    title: "Books",
    links: [
      { id: "book-intro", label: "Ergodicity Library: An Introduction", href: internalLinks.bookIntro },
      { id: "book-adventures", label: "Adventures In Ergodicity Economics", href: internalLinks.bookAdventures },
    ],
  },
  {
    title: "Demonstrations",
    links: [
      { id: "videos", label: "Videos", href: internalLinks.videos },
      { id: "plots", label: "Plots", href: internalLinks.plots },
      { id: "interactive", label: "Interactive", href: internalLinks.interactive },
    ],
  },
  {
    title: "Useful links and materials",
    links: [
      { id: "education", label: "Education", href: internalLinks.education },
      { id: "research", label: "Research", href: internalLinks.research },
      { id: "ergodicitygpt", label: "ErgodicityGPT", href: internalLinks.ergodicitygpt },
      { id: "tutorials", label: "Video tutorials", href: internalLinks.tutorials },
      { id: "blog", label: "Blog", href: internalLinks.blog },
      { id: "projects", label: "Projects", href: internalLinks.projects },
      { id: "development", label: "Development", href: internalLinks.development },
      { id: "author", label: "About the author", href: internalLinks.author },
    ],
  },
];

function shellMarkup() {
  const sections = menuSections
    .map(
      (section) => `
        <section class="menu-section">
          <h2 class="menu-section__title">${section.title}</h2>
          <div class="menu-list">
            ${section.links
              .map(
                (link) => `
                  <a href="${link.href}" data-nav-id="${link.id}" class="${page === link.id ? "is-active" : ""}">
                    ${link.label}
                  </a>
                `
              )
              .join("")}
          </div>
        </section>
      `
    )
    .join("");

  return `
    <header class="site-header">
      <div class="page-wrap site-header__inner">
        <a class="site-brand" href="${internalLinks.home}">
          <span class="site-brand__name">Ergodicity Library</span>
          <span class="site-brand__links">
            <a href="https://kendiukhov.github.io/ergodicity_library" target="_blank" rel="noopener">Documentation</a>
            <a href="${internalLinks.bookIntro}">Book</a>
          </span>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu">Menu</button>
      </div>
    </header>
    <div class="menu-overlay" id="site-menu" aria-hidden="true">
      <div class="menu-overlay__backdrop" data-close-menu></div>
      <aside class="menu-panel" aria-label="Site navigation">
        <div class="menu-panel__top">
          <span class="menu-panel__title">Menu</span>
          <button class="menu-close" type="button" data-close-menu>Close</button>
        </div>
        ${sections}
      </aside>
    </div>
  `;
}

function footerMarkup() {
  return `
    <footer class="footer">
      <div class="page-wrap footer-grid">
        <section class="footer-card">
          <h2>Contact form</h2>
          <p>Use the embedded Google Form to send questions, feedback, or collaboration inquiries.</p>
          <div class="google-form-embed">
            <iframe
              class="google-form-frame"
              src="https://docs.google.com/forms/d/e/1FAIpQLSdgNZDIhi5MEGhChEXLmrmBdr28SwQk0p6QTwbffKSCtW3w9w/viewform?embedded=true"
              title="Ergodicity Library contact form"
              loading="lazy"
            >
              Loading…
            </iframe>
          </div>
          <p class="caption">
            If the embedded form does not load, open it directly
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdgNZDIhi5MEGhChEXLmrmBdr28SwQk0p6QTwbffKSCtW3w9w/viewform?usp=dialog" target="_blank" rel="noopener">here</a>.
          </p>
        </section>
        <section class="footer-card">
          <h2>Stay Connected with Us</h2>
          <p>www.linktr.ee/kendiukhov</p>
          <p>kendiukhov@gmail.com</p>
          <p>Tuebingen, Germany</p>
          <div class="footer-links">
            <a href="https://kendiukhov.github.io/ergodicity_library" target="_blank" rel="noopener">Documentation</a>
            <a href="https://github.com/Kendiukhov/ergodicity_library" target="_blank" rel="noopener">GitHub Repository</a>
            <a href="https://chatgpt.com/g/g-6a3y1kBrK-ergodicitygpt" target="_blank" rel="noopener">ErgodicityGPT</a>
            <a href="https://linktr.ee/kendiukhov" target="_blank" rel="noopener">Contact Us</a>
          </div>
          <div class="social-row">
            <a href="https://github.com/Kendiukhov" target="_blank" rel="noopener" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.649.5.5 5.649.5 12a11.5 11.5 0 0 0 7.865 10.922c.576.108.784-.25.784-.555 0-.273-.01-1.18-.015-2.14-3.2.696-3.876-1.357-3.876-1.357-.523-1.33-1.278-1.684-1.278-1.684-1.045-.714.079-.699.079-.699 1.156.081 1.765 1.187 1.765 1.187 1.027 1.76 2.694 1.252 3.35.958.104-.744.402-1.253.731-1.54-2.554-.291-5.241-1.277-5.241-5.683 0-1.255.448-2.282 1.183-3.087-.118-.291-.513-1.463.113-3.05 0 0 .964-.309 3.16 1.18a10.89 10.89 0 0 1 5.754 0c2.194-1.489 3.157-1.18 3.157-1.18.628 1.587.233 2.759.115 3.05.737.805 1.182 1.832 1.182 3.087 0 4.417-2.691 5.389-5.253 5.674.413.355.781 1.053.781 2.123 0 1.534-.014 2.77-.014 3.146 0 .308.205.669.79.554A11.503 11.503 0 0 0 23.5 12C23.5 5.649 18.351.5 12 .5Z"/></svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/ikendiukhov/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46a2.48 2.48 0 0 0-.02-4.96ZM3 9h4v12H3Zm7 0h3.83v1.64h.05c.53-1.01 1.84-2.08 3.79-2.08 4.06 0 4.81 2.67 4.81 6.14V21h-4v-5.53c0-1.32-.03-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92V21h-4Z"/></svg>
              LinkedIn
            </a>
            <a href="https://x.com/IKendiukhov" target="_blank" rel="noopener" aria-label="X">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m18.244 2 3.308 0-7.226 8.26L22.82 22h-6.648l-5.204-6.804L4.98 22H1.67l7.728-8.836L1.26 2h6.816l4.7 6.23L18.244 2Zm-1.16 18h1.833L7.08 3.896H5.113Z"/></svg>
              X
            </a>
          </div>
        </section>
      </div>
    </footer>
  `;
}

function injectShell() {
  document.body.insertAdjacentHTML("afterbegin", shellMarkup());
  document.body.insertAdjacentHTML("beforeend", footerMarkup());
}

function bindMenu() {
  const menuButton = document.querySelector(".menu-toggle");
  const overlay = document.querySelector(".menu-overlay");
  if (!menuButton || !overlay) return;

  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    overlay.setAttribute("aria-hidden", String(!open));
  };

  menuButton.addEventListener("click", () => {
    setMenu(!document.body.classList.contains("menu-open"));
  });

  overlay.querySelectorAll("[data-close-menu], a").forEach((node) => {
    node.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
}

injectShell();
bindMenu();
