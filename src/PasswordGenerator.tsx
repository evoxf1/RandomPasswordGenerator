import React from 'react';
import CopyButton from './components/CopyButton';
import PasswordStrength from './components/PasswordStrength';
import Error from './components/Error';

interface PasswordOptions {
  length: number;
  useUppercase: boolean;
  useLowercase: boolean;
  useSymbols: boolean;
  useNumbers: boolean;
}

const usePasswordOptions = (): [PasswordOptions, (options: PasswordOptions) => void] => {
  const [options, setOptions] = React.useState<PasswordOptions>({
    length: 8,
    useUppercase: false,
    useLowercase: false,
    useSymbols: false,
    useNumbers: false,
  });

  const updateOptions = (newOptions: PasswordOptions) => {
    setOptions(newOptions);
  };

  return [options, updateOptions];
};

const PasswordGenerator: React.FC = () => {
  const [options, setOptions] = usePasswordOptions();
  const [generatedPassword, setGeneratedPassword] = React.useState('');
  const [passwordGenerated, setPasswordGenerated] = React.useState(false);
  const [error, setError] = React.useState('');

  const generateNewPassword = () => {
    if (!options.useUppercase && !options.useLowercase && !options.useSymbols && !options.useNumbers) {
      setError('Please select at least one option.');
      return;
    }

    const newPassword = generatePassword();
    setGeneratedPassword(newPassword);
    setPasswordGenerated(true);
    setError('');
  };

  const generatePassword = (): string => {
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
  
    return characters.join('');
  };
  

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newOptions = { ...options, length: Number(event.target.value) };
    setOptions(newOptions);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const newOptions = { ...options, [name]: checked };
    setOptions(newOptions);
  };

  return (
    <div className="container">
      <div className="box">
        <h2 className="title">Random Password Generator</h2>
        <div className="input-group">
          <label htmlFor="password-length" className="label">Password Length:</label>
          <input
            id="password-length"
            type="range"
            min={4}
            max={20}
            value={options.length}
            onChange={handleLengthChange}
            className="range-slider"
          />
          <span>{options.length}</span>
        </div>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="useUppercase"
              checked={options.useUppercase}
              onChange={handleCheckboxChange}
            />
            Uppercase
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="useLowercase"
              checked={options.useLowercase}
              onChange={handleCheckboxChange}
            />
            Lowercase 
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="useSymbols"
              checked={options.useSymbols}
              onChange={handleCheckboxChange}
            />
            Symbols
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="useNumbers"
              checked={options.useNumbers}
              onChange={handleCheckboxChange}
            />
            Numbers
          </label>
        </div>
        {error && <Error message={error} />}
        <div className="button-group">
          <button onClick={generateNewPassword} className="button button-generate">Generate Password</button>
          <CopyButton password={generatedPassword} />
        </div>
        {passwordGenerated && (
          <div className="password-section">
            <strong className="password-label">Password:</strong> <span className="password-value">{generatedPassword}</span>
          </div>
        )}
        <div className="password-strength-section">
          <PasswordStrength length={options.length} />
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
