import React from "react";
import { Card } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import TradeStatusBadge from "./TradeStatusBadge"; // Importing Badge component

const TradeCard = ({ trade }) => {
  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <Card.Title className="mb-1">{trade.symbol}</Card.Title>
            <Card.Subtitle className="text-muted">
              {new Date(trade.timestamp).toLocaleString()}
            </Card.Subtitle>
          </div>
          <div
            className={`p-2 rounded-circle ${
              trade.order_type === "Buy" ? "bg-success text-white" : "bg-danger text-white"
            }`}
          >
            {trade.order_type === "Buy" ? <FaArrowUp /> : <FaArrowDown />}
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <span>Quantity: <strong>{trade.quantity}</strong></span>
          <span>Price: <strong>${trade.price.toFixed(2)}</strong></span>
        </div>
        <div className="mt-2">
          <TradeStatusBadge status={trade.status} /> {/* Calling Badge component */}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TradeCard;
