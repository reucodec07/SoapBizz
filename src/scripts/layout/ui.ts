function initHamburger(): void {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;
  if (hamburger.dataset.bound === '1') return;

  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  hamburger.dataset.bound = '1';
}

function initRevealOnScroll(): void {
  const elements = document.querySelectorAll<HTMLElement>('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );

  elements.forEach((el) => observer.observe(el));
}

export function initLayoutUi(): void {
  initHamburger();
  initRevealOnScroll();
}
