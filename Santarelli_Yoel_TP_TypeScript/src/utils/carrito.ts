import { Product } from '../types/product';
import { ICartItem } from '../types/carrito';

const CART_KEY = 'cart';

export const getCart = (): ICartItem[] => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCart = (cart: ICartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product: Product): void => {
  const cart = getCart();
  const existingItem = cart.find(item => item.product.id === product.id);

  if (existingItem) {
    existingItem.cantidad += 1;
  } else {
    cart.push({ product, cantidad: 1 });
  }

  saveCart(cart);
};

// Disminuir la cantidad de un ítem
export const removeFromCart = (productId: number): void => {
  let cart = getCart();
  const existingItem = cart.find(item => item.product.id === productId);

  if (existingItem) {
    if (existingItem.cantidad > 1) {
      existingItem.cantidad -= 1;
    } else {
      cart = cart.filter(item => item.product.id !== productId);
    }
  }

  saveCart(cart);
};

// Eliminar el ítem completo sin importar la cantidad
export const deleteItemFromCart = (productId: number): void => {
  const cart = getCart().filter(item => item.product.id !== productId);
  saveCart(cart);
};

export const calculateCartTotal = (): number => {
  return getCart().reduce((acc, item) => acc + item.product.precio * item.cantidad, 0);
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_KEY);
};

// Obtener la cantidad total de productos agregados (para el badge del header)
export const getCartItemCount = (): number => {
  return getCart().reduce((acc, item) => acc + item.cantidad, 0);
};