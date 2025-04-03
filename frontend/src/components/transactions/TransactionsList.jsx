import React, { useContext, useState } from "react";
import { TransactionsContext } from "./store";
import TransactionCard from "./TransactionCard";
import TransactionFilters from "./TransactionFilters";

const TransactionsList = () => {
  const { transactions, loading, error } = useContext(TransactionsContext);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredTrades = transactions.filter((trade) => {
    return (
      trade.symbol.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? trade.status === statusFilter : true) &&
      (amountFilter ? trade.price <= parseFloat(amountFilter) : true)
    );
  });

  return (
    <div>
      <TransactionFilters 
        search={search} setSearch={setSearch} 
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        amountFilter={amountFilter} setAmountFilter={setAmountFilter} 
      />
      <div className="row">
        {filteredTrades.length > 0 ? (
          filteredTrades.map((trade) => (
            <div key={trade.id} className="col-md-4 mb-3">
              <TransactionCard trade={trade} />
            </div>
          ))
        ) : (
          <p>No matching transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionsList;