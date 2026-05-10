const STORAGE_KEY = 'sb_popup_dismissed';

function hasDismissed(): boolean {
  try {
    return Boolean(localStorage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
}

function markDismissed(): void {
  try {
    localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // ignore storage failures
  }
}

export function initEmailPopup(): void {
  if (hasDismissed()) return;

  const overlay = document.getElementById('popup-overlay');
  const box = document.getElementById('popup-box');
  const closeBtn = document.getElementById('popup-close');
  const skipBtn = document.getElementById('popup-skip');
  const form = document.getElementById('popup-form');
  const main = document.querySelector<HTMLElement>('.popup-main');
  const success = document.getElementById('popup-success');
  if (!overlay || !box || !closeBtn || !skipBtn || !form || !main || !success) return;

  if (overlay.dataset.bound === '1') return;

  const openPopup = () => {
    overlay.classList.add('open');
    box.classList.add('open');
  };

  const closePopup = () => {
    overlay.classList.remove('open');
    box.classList.remove('open');
    markDismissed();
  };

  const timer = setTimeout(openPopup, 30000);
  document.addEventListener(
    'mouseleave',
    (event) => {
      if (event.clientY <= 0) {
        clearTimeout(timer);
        openPopup();
      }
    },
    { once: true },
  );

  closeBtn.addEventListener('click', closePopup);
  skipBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', closePopup);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    main.style.display = 'none';
    success.style.display = 'block';
    setTimeout(closePopup, 4000);
    markDismissed();
  });

  overlay.dataset.bound = '1';
}
