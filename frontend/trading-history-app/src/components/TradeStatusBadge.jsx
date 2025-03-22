import React from "react";

const TradeStatusBadge = ({ status }) => {
  return (
    <span className={`badge ${status === "Completed" ? "bg-success" : "bg-warning text-dark"}`}>
      {status}
    </span>
  );
};

export default TradeStatusBadge;
