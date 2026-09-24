import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findOrder, filterOrdersByMinTotal } from '../src/orders.js';
const orders = [{ id: 'one', total: 1500 }, { id: 'two', total: 5000 }];

test('find existing order and return undefined for missing ID', () => {
  assert.deepEqual(findOrder(orders, 'one'), orders[0]);
  assert.equal(findOrder(orders, 'missing'), undefined);
  assert.equal(findOrder([], 'one'), undefined);
});
test('minimum-total filter includes exact boundary', () => {
  assert.deepEqual(filterOrdersByMinTotal(orders, 5000), [orders[1]]);
  assert.deepEqual(filterOrdersByMinTotal(orders, 0), orders);
  assert.deepEqual(filterOrdersByMinTotal(orders, 6000), []);
});
test('reject invalid filter threshold', () => {
  for (const value of [-1, NaN, Infinity, '10', null]) {
    assert.throws(() => filterOrdersByMinTotal(orders, value), /Minimum total/);
  }
});
test('history functions return independent snapshots', () => {
  findOrder(orders, 'one').total = 0;
  filterOrdersByMinTotal(orders, 0)[0].total = 0;
  assert.equal(orders[0].total, 1500);
});
