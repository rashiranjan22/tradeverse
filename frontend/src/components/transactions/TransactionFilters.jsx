import React from 'react';
import { Form } from 'react-bootstrap';

const TransactionFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter,
  orderTypeFilter,
  setOrderTypeFilter 
}) => {
  return (
    <div className="mb-4 p-3 bg-light rounded">
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by symbol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      
      <div className="row">
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </Form.Select>
          </Form.Group>
        </div>
        
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label>Order Type</Form.Label>
            <Form.Select
              value={orderTypeFilter}
              onChange={(e) => setOrderTypeFilter(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
            </Form.Select>
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;