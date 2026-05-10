import { initCartDrawer, initCartState } from './cart';
import { initEmailPopup } from './popup';
import { initThemeToggle } from './theme';
import { initLayoutUi } from './ui';

function initialize(): void {
  initThemeToggle();
  initCartState();
  initCartDrawer();
  initLayoutUi();
  initEmailPopup();
}

document.addEventListener('astro:page-load', initialize);
initialize();
