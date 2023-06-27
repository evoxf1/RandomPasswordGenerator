import React, { useState } from 'react';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState({
    length: 8,
    useUppercase: true,
    useLowercase: true,
    useSymbols: true,
    useNumbers: true,
  });

  const generatePassword = () => {
    const { length, useUppercase, useLowercase, useSymbols, useNumbers } = options;
    const characters = [];
    let possibleCharacters = '';

    if (useUppercase) possibleCharacters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLowercase) possibleCharacters += 'abcdefghijklmnopqrstuvwxyz';
    if (useSymbols) possibleCharacters += '!@#$%^&*()-_=+[{]};:<>./?';
    if (useNumbers) possibleCharacters += '0123456789';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
      characters.push(possibleCharacters[randomIndex]);
    }

    setPassword(characters.join(''));
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      length: Number(event.target.value),
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };

  const getPasswordStrength = () => {
    const { length } = options;
    if (length < 6) {
      return 'Weak';
    } else if (length < 10) {
      return 'Medium';
    } else {
      return 'Strong';
    }
  };

  return (
    <div>
      <h2>Random Password Generator</h2>
      <div>
        <label htmlFor="password-length">Password Length:</label>
        <input
          id="password-length"
          type="range"
          min={4}
          max={20}
          value={options.length}
          onChange={handleLengthChange}
        />
        <span>{options.length}</span>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="useUppercase"
            checked={options.useUppercase}
            onChange={handleCheckboxChange}
          />
          Uppercase Letters
        </label>
        <label>
          <input
            type="checkbox"
            name="useLowercase"
            checked={options.useLowercase}
            onChange={handleCheckboxChange}
          />
          Lowercase Letters
        </label>
        <label>
          <input
            type="checkbox"
            name="useSymbols"
            checked={options.useSymbols}
            onChange={handleCheckboxChange}
          />
          Symbols
        </label>
        <label>
          <input
            type="checkbox"
            name="useNumbers"
            checked={options.useNumbers}
            onChange={handleCheckboxChange}
          />
          Numbers
        </label>
      </div>
      <div>
        <button onClick={generatePassword}>Generate Password</button>
        <button onClick={handleCopyPassword}>Copy Password</button>
      </div>
      <div>
        <strong>Password:</strong> {password}
      </div>
      <div>
        <strong>Strength:</strong> {getPasswordStrength()}
      </div>
    </div>
  );
};

export default PasswordGenerator;
