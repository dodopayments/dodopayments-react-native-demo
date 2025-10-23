// Mock product data for demo

export const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Enterprise Plan - Annual Subscription',
    size: 'Enterprise',
    price: 299.99,
    quantity: 1,
    image: require('../assets/placeholder.webp'),
  },
  {
    id: '2',
    name: 'Team Plan - Monthly Subscription',
    size: 'Team',
    price: 149.99,
    quantity: 5,
    image: require('../assets/placeholder2.png'),
  },
];

// Calculate order totals
export const calculateTotals = () => {
  const subtotal = MOCK_PRODUCTS.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );
  const shipping = 0;
  const taxes = 12.0;
  const otherFees = 0.0;
  const total = subtotal + shipping + taxes + otherFees;

  return {subtotal, shipping, taxes, otherFees, total};
};

