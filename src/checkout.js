import { randomUUID } from 'node:crypto';
import { getCart, clearCart } from './cart.js';

const orders = [];

export function createOrder(address) {
  const items = getCart();
  if (items.length === 0) throw new Error('Cart is empty');
  if (typeof address !== 'string' || !address.trim()) {
    throw new TypeError('Delivery address is required');
  }
  const order = {
    id: randomUUID(), items, address: address.trim(),
    total: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  };
  orders.push(order);
  clearCart();
  return structuredClone(order);
}

export function getOrders() { return structuredClone(orders); }
export function clearOrders() { orders.length = 0; }
