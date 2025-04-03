import React from "react";

const TransactionStatusBadge = ({ status }) => {
  const badgeClass = status === "COMPLETED" ? "badge bg-success" : "badge bg-warning text-dark";

  return <span className={badgeClass}>{status}</span>;
};

export default TransactionStatusBadge;