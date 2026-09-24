export function findOrder(orders, orderId) {
  const order = orders.find(item => item.id === orderId);
  return order === undefined ? undefined : structuredClone(order);
}

export function filterOrdersByMinTotal(orders, minTotal) {
  if (typeof minTotal !== 'number' || !Number.isFinite(minTotal) || minTotal < 0) {
    throw new RangeError('Minimum total must be a nonnegative finite number');
  }
  return structuredClone(orders.filter(order => order.total >= minTotal));
}
