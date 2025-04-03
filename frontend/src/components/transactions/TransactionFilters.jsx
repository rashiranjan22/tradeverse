import React from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";

const TransactionFilters = ({ search, setSearch, statusFilter, setStatusFilter, amountFilter, setAmountFilter }) => {
  return (
    <div className="d-flex flex-wrap gap-3 mb-4">
      {/* Search Input */}
      <InputGroup className="flex-grow-1">
        <FormControl
          type="text"
          placeholder="Search by symbol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      {/* Status Dropdown */}
      <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="flex-grow-1">
        <option value="">All Status</option>
        <option value="COMPLETED">Completed</option>
        <option value="PENDING">Pending</option>
      </Form.Select>

      {/* Max Amount Input */}
      <InputGroup className="flex-grow-1">
        <FormControl
          type="number"
          placeholder="Max Amount"
          value={amountFilter}
          onChange={(e) => setAmountFilter(e.target.value)}
        />
      </InputGroup>
    </div>
  );
};

export default TransactionFilters;