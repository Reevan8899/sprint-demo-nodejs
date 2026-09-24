import { test } from 'node:test';
import assert from 'node:assert/strict';
import { listProducts, getProduct } from '../src/catalog.js';

test('catalog contains three products with positive prices', () => {
  assert.equal(listProducts().length, 3);
  assert.ok(listProducts().every(product => product.price > 0));
});
test('get product by numeric ID', () => {
  assert.deepEqual(getProduct(2), { id: 2, name: 'Мышь', price: 1500 });
});
test('unknown or wrong-type ID is rejected', () => {
  assert.throws(() => getProduct(999), /not found/);
  assert.throws(() => getProduct('2'), /not found/);
});
