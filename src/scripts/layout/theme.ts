const SUN_ICON =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
const MOON_ICON =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

function readStoredTheme(): string {
  try {
    return localStorage.getItem('theme') || '';
  } catch {
    return '';
  }
}

function writeStoredTheme(theme: string): void {
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // ignore storage failures
  }
}

export function initThemeToggle(): void {
  const html = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  if (btn.dataset.bound === '1') return;

  const applyTheme = (theme: string) => {
    html.setAttribute('data-theme', theme);
    writeStoredTheme(theme);
    btn.innerHTML = theme === 'dark' ? SUN_ICON : MOON_ICON;
  };

  const stored = readStoredTheme();
  const initial =
    stored || (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  applyTheme(initial);

  btn.addEventListener('click', () => {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  btn.dataset.bound = '1';
}
