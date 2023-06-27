import React from 'react';

interface PasswordStrengthProps {
  length: number;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ length }) => {
  let strength = 'Weak';

  if (length >= 6 && length < 10) {
    strength = 'Medium';
  } else if (length >= 10) {
    strength = 'Strong';
  }

  return <strong>Strength: {strength}</strong>;
};

export default PasswordStrength;
