import { register, login } from './auth.js';
import { listProducts, getProduct } from './catalog.js';
import { addToCart, totalPrice, getCart } from './cart.js';
import { createOrder, getOrders } from './checkout.js';
import { findOrder, filterOrdersByMinTotal } from './orders.js';

console.log('Register:', register('demo@example.com', 'DemoPass2026!'));
console.log('Login:', login('demo@example.com', 'DemoPass2026!'));
console.log('Catalog:', JSON.stringify(listProducts()));
addToCart(getProduct(2), 2);
addToCart(getProduct(3));
console.log('Cart total:', totalPrice(), 'RUB');
const order = createOrder('Учебный адрес, дом 1');
console.log('Order:', order.id, '| total:', order.total, '| items:', order.items.length);
console.log('Cart after checkout:', getCart().length);
console.log('Order found:', findOrder(getOrders(), order.id)?.id === order.id);
console.log('Orders >= 6000 RUB:', filterOrdersByMinTotal(getOrders(), 6000).length);
