import { test } from 'node:test';
import assert from 'node:assert/strict';
test('Node.js 24 or newer is available', () => {
  assert.ok(Number(process.versions.node.split('.')[0]) >= 24);
});
