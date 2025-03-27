import React from 'react';
import { Card } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import TransactionStatusBadge from './TransactionStatusBadge';

const TransactionCard = ({ transaction }) => {
  return (
    <Card className="transaction-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title className="transaction-symbol mb-1">
              {transaction.symbol}
            </Card.Title>
            <Card.Subtitle className="transaction-meta">
              {new Date(transaction.timestamp).toLocaleString()}
            </Card.Subtitle>
          </div>
          <div className={`badge ${transaction.order_type === 'Buy' ? 'bg-success' : 'bg-danger'}`}>
            {transaction.order_type}
          </div>
        </div>
        
        <div className="transaction-details mt-3 d-flex justify-content-between">
          <div>
            <p className="transaction-detail-item mb-2">
              <strong>Quantity:</strong> {transaction.quantity}
            </p>
            <p className="transaction-detail-item mb-0">
              <strong>Price:</strong> ${transaction.price.toFixed(2)}
            </p>
          </div>
          <TransactionStatusBadge status={transaction.status} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default TransactionCard;