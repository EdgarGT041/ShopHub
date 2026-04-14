export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatRating = (rating: number): string => {
  return `${rating.toFixed(1)} / 5.0`;
};

export const formatStockStatus = (stock: number): string => {
  if (stock <= 0) {
    return 'Out of stock';
  }

  if (stock <= 5) {
    return `Only ${stock} left`;
  }

  return 'In stock';
};
