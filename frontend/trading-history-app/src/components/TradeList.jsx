import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./animations.css"; // Import CSS animations

const TradeList = ({ trades }) => {
  return (
    <Row>
      {trades.length > 0 ? (
        trades.map((trade, index) => (
          <Col md={6} key={index} className="mb-3 fade-in">
            <Card className="p-3 shadow-sm border-0 rounded-4 trade-card">
              <Card.Body>
                {/* Symbol & Exchange */}
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-primary fs-5">{trade.symbol}</span>
                  <span className="text-muted">({trade.exchange})</span>
                </Card.Title>

                {/* Trade Details */}
                <Card.Text className="mt-2">
                  <strong>Order:</strong> {trade.order_type}{" "}
                  {trade.order_type === "Buy" ? (
                    <FaArrowUp className="text-success" />
                  ) : (
                    <FaArrowDown className="text-danger" />
                  )}
                  <br />
                  <strong>Quantity:</strong> {trade.quantity} <br />
                  <strong>Price:</strong> ${trade.price} <br />
                  <strong>Status:</strong>{" "}
                  <span className={trade.status === "Completed" ? "text-success fw-bold" : "text-warning fw-bold"}>
                    {trade.status}
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <p className="text-center mt-3 fade-in">No trades match the selected filters.</p>
      )}
    </Row>
  );
};

export default TradeList;
