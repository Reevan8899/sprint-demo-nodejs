import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const users = new Map();

function normalizeEmail(email) {
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw new TypeError('Invalid email');
  }
  return email.trim().toLowerCase();
}

export function register(email, password) {
  const key = normalizeEmail(email);
  if (typeof password !== 'string' || password.length < 8) {
    throw new TypeError('Password must contain at least 8 characters');
  }
  if (users.has(key)) throw new Error('Email already registered');
  const salt = randomBytes(16);
  users.set(key, { salt, hash: scryptSync(password, salt, 64) });
  return true;
}

export function login(email, password) {
  let key;
  try { key = normalizeEmail(email); } catch { return false; }
  const user = users.get(key);
  if (!user || typeof password !== 'string') return false;
  return timingSafeEqual(user.hash, scryptSync(password, user.salt, 64));
}

export function resetUsers() { users.clear(); }
