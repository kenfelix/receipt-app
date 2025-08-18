// utils/currencyFormatter.ts

// Function to format currency to Nigerian Naira (NGN)
export const formatCurrency = (amount: number): string => {
    // Specify 'amount' as number and return type as string
  return amount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
};
