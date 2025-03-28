import { createContext, useEffect, useState } from 'react';
import { fetchTransactions } from '../../api';

export const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
        console.error("Error loading transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, loading, error }}>
      {children}
    </TransactionsContext.Provider>
  );
}