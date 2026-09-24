const cart = new Map();

export function addToCart(product, quantity = 1) {
  if (!product || !Number.isSafeInteger(product.id) || product.id <= 0 ||
      typeof product.name !== 'string' || !product.name.trim() ||
      !Number.isSafeInteger(product.price) || product.price < 0) {
    throw new TypeError('Invalid product');
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Quantity must be a positive integer');
  }
  const current = cart.get(product.id);
  const nextQuantity = (current?.quantity ?? 0) + quantity;
  cart.set(product.id, { product: { ...(current?.product ?? product) }, quantity: nextQuantity });
}

export function getCart() { return structuredClone([...cart.values()]); }
export function clearCart() { cart.clear(); }
export function totalPrice() {
  return [...cart.values()].reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}
