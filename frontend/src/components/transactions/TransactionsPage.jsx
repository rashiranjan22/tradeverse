import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { TransactionsContext } from './store';
import TransactionsList from './TransactionsList';
import TransactionFilters from './TransactionFilters';
import './styles.css';

const TransactionsPage = () => {
  const { transactions, loading, error } = React.useContext(TransactionsContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [orderTypeFilter, setOrderTypeFilter] = useState('');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? transaction.status === statusFilter : true;
    const matchesOrderType = orderTypeFilter ? transaction.order_type === orderTypeFilter : true;
    
    return matchesSearch && matchesStatus && matchesOrderType;
  });

  if (loading) return <Container className="no-transactions">Loading transactions...</Container>;
  if (error) return <Container className="no-transactions text-danger">Error: {error}</Container>;

  return (
    <Container className="transactions-container">
      <h2 className="transactions-header">Your Transactions</h2>
      
      <div className="transaction-filters">
        <TransactionFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          orderTypeFilter={orderTypeFilter}
          setOrderTypeFilter={setOrderTypeFilter}
        />
      </div>
      
      <TransactionsList transactions={filteredTransactions} />
    </Container>
  );
};

export default TransactionsPage;