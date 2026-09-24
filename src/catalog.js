const products = [
  { id: 1, name: 'Ноутбук', price: 75000 },
  { id: 2, name: 'Мышь', price: 1500 },
  { id: 3, name: 'Клавиатура', price: 3500 },
];

export function listProducts() { return products; }

export function getProduct(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) throw new RangeError(`Product ${productId} not found`);
  return { ...product };
}
