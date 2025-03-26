import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { TransactionsContext } from './store';
import TransactionsList from './TransactionsList';
import TransactionFilters from './TransactionFilters';

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

  if (loading) return <Container className="text-center py-5">Loading transactions...</Container>;
  if (error) return <Container className="text-center py-5 text-danger">Error: {error}</Container>;

  return (
    <Container className="py-4">
      <h2 className="mb-4">Your Transactions</h2>
      
      <TransactionFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        orderTypeFilter={orderTypeFilter}
        setOrderTypeFilter={setOrderTypeFilter}
      />
      
      <TransactionsList transactions={filteredTransactions} />
    </Container>
  );
};

export default TransactionsPage;