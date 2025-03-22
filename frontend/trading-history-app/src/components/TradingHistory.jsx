import React, { useState } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import TradeList from "./TradeList";
import tradesData from "../store/mockTrades";
import "./animations.css"; // Import CSS animations

const TradingHistory = () => {
  const [trades] = useState(tradesData);
  const [statusFilter, setStatusFilter] = useState("");
  const [priceRange, setPriceRange] = useState(500);
  const [orderTypeFilter, setOrderTypeFilter] = useState(""); // New filter for Buy/Sell

  // Filtering logic
  const filteredTrades = trades.filter((trade) => {
    const statusMatch = statusFilter ? trade.status === statusFilter : true;
    const priceMatch = trade.price <= priceRange;
    const orderTypeMatch = orderTypeFilter ? trade.order_type === orderTypeFilter : true; // New filter logic
    return statusMatch && priceMatch && orderTypeMatch;
  });

  return (
    <Container className="mt-4 fade-in">
      <Card className="shadow-lg p-4 border-0 rounded-4">
        <h2 className="text-center mb-4 fw-bold">Trading History</h2>

        {/* Filters Section */}
        <Row className="mb-4">
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-bold">Filter by Status</Form.Label>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-pill transition-effect"
              >
                <option value="">All</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-bold">Filter by Order Type</Form.Label>
              <Form.Select
                value={orderTypeFilter}
                onChange={(e) => setOrderTypeFilter(e.target.value)}
                className="rounded-pill transition-effect"
              >
                <option value="">All</option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-bold">Price Range (Max: ${priceRange})</Form.Label>
              <Form.Range
                min={0}
                max={500}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="transition-effect"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Trade List Component */}
        <TradeList trades={filteredTrades} />
      </Card>
    </Container>
  );
};

export default TradingHistory;


