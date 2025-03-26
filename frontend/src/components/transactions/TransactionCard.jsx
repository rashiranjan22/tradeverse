import React from 'react';
import { Card } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import TransactionStatusBadge from './TransactionStatusBadge';

const TransactionCard = ({ transaction }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title className="mb-1">{transaction.symbol}</Card.Title>
            <Card.Subtitle className="text-muted small">
              {new Date(transaction.timestamp).toLocaleString()}
            </Card.Subtitle>
          </div>
          <div className={`badge ${transaction.order_type === 'Buy' ? 'bg-success' : 'bg-danger'}`}>
            {transaction.order_type}
          </div>
        </div>
        
        <div className="mt-3 d-flex justify-content-between">
          <div>
            <span className="d-block">Quantity: {transaction.quantity}</span>
            <span className="d-block">Price: ${transaction.price.toFixed(2)}</span>
          </div>
          <TransactionStatusBadge status={transaction.status} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default TransactionCard;