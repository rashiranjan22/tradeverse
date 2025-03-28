import React from 'react';
import { Badge } from 'react-bootstrap';

const TransactionStatusBadge = ({ status }) => {
  return (
    <Badge pill bg={status === 'Completed' ? 'success' : 'warning'}>
      {status}
    </Badge>
  );
};

export default TransactionStatusBadge;