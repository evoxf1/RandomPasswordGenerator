import React from 'react';

interface CopyButtonProps {
  password: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ password }) => {
  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <button className="button button-copy" onClick={handleCopyPassword}>
      Copy 
    </button>
  );
};

export default CopyButton;
