import { beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { addToCart, getCart, clearCart, totalPrice } from '../src/cart.js';
const mouse = { id: 2, name: 'Мышь', price: 1500 };

beforeEach(clearCart);
test('add product, combine quantities and calculate total', () => {
  addToCart(mouse);
  addToCart(mouse, 2);
  assert.equal(getCart().length, 1);
  assert.equal(getCart()[0].quantity, 3);
  assert.equal(totalPrice(), 4500);
});
test('empty and cleared cart cost zero', () => {
  assert.equal(totalPrice(), 0);
  addToCart(mouse);
  clearCart();
  assert.deepEqual(getCart(), []);
  assert.equal(totalPrice(), 0);
});
test('reject nonpositive and fractional quantities', () => {
  for (const quantity of [0, -1, 1.5, NaN, Infinity, '2']) {
    assert.throws(() => addToCart(mouse, quantity), /Quantity/);
  }
  assert.deepEqual(getCart(), []);
});
test('reject invalid product', () => {
  for (const product of [null, {}, { ...mouse, price: -1 }, { ...mouse, name: '' }]) {
    assert.throws(() => addToCart(product), /Invalid product/);
  }
});
test('cart protects its state from outside mutation', () => {
  const product = { ...mouse };
  addToCart(product);
  product.price = 0;
  const result = getCart();
  result[0].product.price = 1;
  result[0].quantity = 99;
  assert.equal(totalPrice(), 1500);
});

test('reject unsafe quantity and amount without mutating cart', () => {
  assert.throws(() => addToCart(mouse, Number.MAX_SAFE_INTEGER + 1), /Quantity/);
  assert.throws(() => addToCart(mouse, Number.MAX_SAFE_INTEGER), /safe integer/);
  assert.deepEqual(getCart(), []);
  addToCart({ id: 4, name: 'Free sample', price: 0 }, Number.MAX_SAFE_INTEGER);
  assert.throws(() => addToCart({ id: 4, name: 'Free sample', price: 0 }), /safe integer/);
  assert.equal(getCart()[0].quantity, Number.MAX_SAFE_INTEGER);
  clearCart();
  addToCart({ id: 5, name: 'Expensive item', price: Number.MAX_SAFE_INTEGER });
  assert.throws(() => addToCart(mouse), /safe integer/);
  assert.equal(getCart().length, 1);
});
