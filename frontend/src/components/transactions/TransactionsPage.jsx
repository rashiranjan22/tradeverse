import React, { useState, useContext } from "react";
import TransactionsList from "./TransactionsList";
import TransactionFilters from "./TransactionFilters";
import { TransactionsContext } from "./store";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const TransactionsPage = () => {
  const { transactions, loading, error } = useContext(TransactionsContext);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");

  if (loading) return <p className="text-center mt-4">Loading transactions...</p>;

  return (
    <motion.div 
      className="container mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-3 text-center text-primary">Trading History</h2>

      {/* Display Error Message */}
      {error && (
        <motion.div 
          className="alert alert-danger text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Error: {error}
        </motion.div>
      )}

      
      {/* Transactions List */}
      <TransactionsList 
        transactions={transactions} 
        search={search} 
        statusFilter={statusFilter} 
        amountFilter={amountFilter} 
      />
    </motion.div>
  );
};

export default TransactionsPage;