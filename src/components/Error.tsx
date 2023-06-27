import React from 'react';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div style={{ color: 'red' }}>
      <strong>Error:</strong> {message}
    </div>
  );
};

export default Error;
