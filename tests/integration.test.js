import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register, login, resetUsers } from '../src/auth.js';
import { getProduct } from '../src/catalog.js';
import { addToCart, clearCart, getCart, totalPrice } from '../src/cart.js';
import { createOrder, getOrders, clearOrders } from '../src/checkout.js';
import { findOrder, filterOrdersByMinTotal } from '../src/orders.js';

test('full purchase flow integrates all five features', () => {
  resetUsers(); clearCart(); clearOrders();
  register('buyer@example.com', 'SecurePass2026!');
  assert.equal(login('buyer@example.com', 'SecurePass2026!'), true);
  addToCart(getProduct(2), 2);
  addToCart(getProduct(3));
  assert.equal(totalPrice(), 6500);
  const order = createOrder('Учебный адрес');
  assert.equal(order.total, 6500);
  assert.deepEqual(getCart(), []);
  assert.deepEqual(findOrder(getOrders(), order.id), order);
  assert.deepEqual(filterOrdersByMinTotal(getOrders(), 6500), [order]);
});
