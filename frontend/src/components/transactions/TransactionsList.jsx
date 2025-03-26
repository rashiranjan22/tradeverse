import React from 'react';
import TransactionCard from './TransactionCard';
import './styles.css';

const TransactionsList = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-4">
        <p>No transactions found</p>
      </div>
    );
  }

  return (
    <div className="transactions-list">
      {transactions.map(transaction => (
        <TransactionCard 
          key={transaction.id} 
          transaction={transaction} 
        />
      ))}
    </div>
  );
};

export default TransactionsList;