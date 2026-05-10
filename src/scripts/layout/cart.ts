import type { CartInput, CartItem, CartState } from '../../types/cart';

const CART_STORAGE_KEY = 'soapCart';

function readStoredItems(): CartItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeColor(value: string): string {
  if (!value) return '#cccccc';
  return value.charAt(0) === '#' ? value : `#${value}`;
}

function openCart(): void {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
}

export function closeCart(): void {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
}

function createCartState(): CartState {
  const items: CartItem[] = readStoredItems();

  const save = (): void => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage failures
    }
  };

  const getTotal = (): number =>
    items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  const notify = (): void => {
    const countEl = document.getElementById('cart-count');
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    if (countEl) countEl.textContent = String(count);
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { items: items.slice() } }));
  };

  const renderCart = (): void => {
    const list = document.getElementById('cart-items-list');
    const footer = document.getElementById('cart-footer');
    const priceEl = document.getElementById('cart-total-price');
    if (!list) return;

    list.replaceChildren();
    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'cart-empty';

      const emptyIcon = document.createElement('div');
      emptyIcon.className = 'cart-empty-icon';
      emptyIcon.textContent = '🧼';

      const emptyText = document.createElement('p');
      emptyText.textContent = 'Your basket is empty.';

      const startLink = document.createElement('a');
      startLink.href = '/shop';
      startLink.className = 'btn';
      startLink.style.marginTop = 'var(--sp-2)';
      startLink.textContent = 'Start Shopping';

      empty.append(emptyIcon, emptyText, startLink);
      list.appendChild(empty);
      if (footer) footer.style.display = 'none';
      return;
    }

    items.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'cart-item';

      const swatch = document.createElement('div');
      swatch.className = 'cart-item-swatch';
      swatch.style.backgroundColor = normalizeColor(item.color);

      const info = document.createElement('div');
      info.className = 'cart-item-info';

      const title = document.createElement('h4');
      title.textContent = item.title;

      const scent = document.createElement('p');
      scent.textContent = `${item.scent} · Qty: ${item.quantity}`;
      info.append(title, scent);

      const price = document.createElement('span');
      price.className = 'cart-item-price';
      price.textContent = `£${(parseFloat(item.price) * item.quantity).toFixed(2)}`;

      const removeBtn = document.createElement('button');
      removeBtn.className = 'cart-item-remove';
      removeBtn.setAttribute('aria-label', `Remove ${item.title}`);
      removeBtn.textContent = '✕';
      removeBtn.addEventListener('click', () => {
        for (let i = items.length - 1; i >= 0; i -= 1) {
          if (items[i].id === item.id) items.splice(i, 1);
        }
        save();
        notify();
        renderCart();
      });

      row.append(swatch, info, price, removeBtn);
      list.appendChild(row);
    });

    if (footer) footer.style.display = 'block';
    if (priceEl) priceEl.textContent = `£${getTotal().toFixed(2)}`;
  };

  const addItem = (item: CartInput): void => {
    const existing = items.find((entry) => entry.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ ...item, quantity: 1 });
    }
    save();
    notify();
    renderCart();
    openCart();
  };

  const clear = (): void => {
    items.length = 0;
    save();
    notify();
    renderCart();
  };

  return {
    get items() {
      return items;
    },
    addItem,
    removeItem: (id: string) => {
      for (let i = items.length - 1; i >= 0; i -= 1) {
        if (items[i].id === id) items.splice(i, 1);
      }
      save();
      notify();
      renderCart();
    },
    clear,
    getTotal,
    save,
    notify,
    renderCart,
  };
}

export function initCartState(): void {
  if (!window.cartState) {
    window.cartState = createCartState();
  }
  window.cartState.notify();
}

export function initCartDrawer(): void {
  const openBtn = document.getElementById('cart-open-btn');
  const closeBtn = document.getElementById('cart-close-btn');
  const overlay = document.getElementById('cart-overlay');
  if (!openBtn || !closeBtn || !overlay || !window.cartState) return;
  if (openBtn.dataset.bound === '1') return;

  openBtn.addEventListener('click', () => {
    window.cartState?.renderCart();
    openCart();
  });
  closeBtn.addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);

  openBtn.dataset.bound = '1';
}
