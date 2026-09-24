import { beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { addToCart, clearCart, getCart } from '../src/cart.js';
import { createOrder, getOrders, clearOrders } from '../src/checkout.js';
const mouse = { id: 2, name: 'Мышь', price: 1500 };

beforeEach(() => { clearCart(); clearOrders(); });
test('checkout saves order snapshot and clears cart', () => {
  addToCart(mouse, 2);
  const order = createOrder('  Учебный адрес 1  ');
  assert.equal(order.address, 'Учебный адрес 1');
  assert.equal(order.total, 3000);
  assert.match(order.id, /^[a-f0-9-]{36}$/);
  assert.deepEqual(getCart(), []);
  assert.equal(getOrders().length, 1);
});
test('reject empty cart', () => {
  assert.throws(() => createOrder('Учебный адрес'), /empty/);
  assert.deepEqual(getOrders(), []);
});
test('invalid address leaves cart and orders unchanged', () => {
  addToCart(mouse);
  for (const address of ['', '   ', null, 123]) {
    assert.throws(() => createOrder(address), /address/);
  }
  assert.equal(getCart().length, 1);
  assert.deepEqual(getOrders(), []);
});
test('returned and stored orders are independent copies', () => {
  addToCart(mouse);
  const order = createOrder('Учебный адрес');
  order.items[0].product.price = 0;
  getOrders()[0].items[0].quantity = 99;
  assert.equal(getOrders()[0].items[0].product.price, 1500);
  assert.equal(getOrders()[0].items[0].quantity, 1);
});
test('each order has a distinct ID; storage can be reset', () => {
  addToCart(mouse);
  const first = createOrder('Учебный адрес');
  addToCart(mouse);
  const second = createOrder('Учебный адрес');
  assert.notEqual(first.id, second.id);
  clearOrders();
  assert.deepEqual(getOrders(), []);
});
