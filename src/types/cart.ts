export interface CartInput {
  id: string;
  title: string;
  price: string;
  scent: string;
  color: string;
}

export interface CartItem extends CartInput {
  quantity: number;
}

export interface CartUpdatedDetail {
  items: CartItem[];
}

export interface CartState {
  readonly items: CartItem[];
  addItem: (item: CartInput) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  getTotal: () => number;
  save: () => void;
  notify: () => void;
  renderCart: () => void;
}
