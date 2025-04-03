import React from "react";
import { Card } from "react-bootstrap";
import TransactionStatusBadge from "./TransactionStatusBadge";

const TransactionCard = ({ trade }) => {
  return (
    <Card className="p-3 shadow-sm border-0 rounded transaction-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold text-primary">{trade.symbol}</h5>
          <TransactionStatusBadge status={trade.status} />
        </div>
        <hr />
        <div className="transaction-details">
          <p><strong>Amount:</strong> ${trade.price}</p>
          <p><strong>Quantity:</strong> {trade.quantity}</p>
          <p><strong>Type:</strong> {trade.order_type}</p>
          <p><strong>Date:</strong> {new Date(trade.timestamp).toLocaleString()}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TransactionCard;