/// <reference path="../.astro/types.d.ts" />

import type { CartState } from './types/cart';

declare global {
  interface Window {
    cartState?: CartState;
  }
}
