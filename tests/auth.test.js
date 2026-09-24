import { beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { register, login, resetUsers } from '../src/auth.js';

beforeEach(resetUsers);
test('register and login successfully', () => {
  assert.equal(register('user@example.com', 'securepass123'), true);
  assert.equal(login('user@example.com', 'securepass123'), true);
});
test('reject invalid email and short password', () => {
  for (const email of ['', null, 'invalid-email', 'a@b']) {
    assert.throws(() => register(email, 'securepass123'), /email/);
  }
  assert.throws(() => register('user@example.com', 'short'), /8 characters/);
  assert.throws(() => register('user@example.com', null), /8 characters/);
});
test('email is trimmed, case insensitive and unique', () => {
  register(' User@Example.com ', 'securepass123');
  assert.throws(() => register('user@example.com', 'otherpass123'), /already/);
  assert.equal(login('USER@example.com', 'securepass123'), true);
});
test('incorrect credentials return false', () => {
  register('user@example.com', 'securepass123');
  assert.equal(login('user@example.com', 'wrongpass'), false);
  assert.equal(login('nobody@example.com', 'securepass123'), false);
  assert.equal(login(null, 'securepass123'), false);
});
