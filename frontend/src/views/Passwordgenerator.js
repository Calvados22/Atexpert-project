import React, { useState } from 'react';
import "../css/Passwordgenerator.css";

const generateStrongPassword = (numWords, wordLength, includeNumbers, includeSymbols) => {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let allChars = lowercaseChars + uppercaseChars;
  if (includeNumbers) {
    allChars += numbers;
  }
  if (includeSymbols) {
    allChars += symbols;
  }

  let password = '';
  for (let i = 0; i < numWords; i++) {
    let word = '';
    for (let j = 0; j < wordLength; j++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      word += allChars[randomIndex];
    }
    password += i === 0 ? word : `-${word}`;
  }

  return password;
};

const Passwordgenerator = () => {
  const [password, setPassword] = useState('');
  const [numWords, setNumWords] = useState(3);
  const [wordLength, setWordLength] = useState(4);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword(numWords, wordLength, includeNumbers, includeSymbols);
    setPassword(newPassword);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="password-generator">
      <h2>Strong Password Generator</h2>
      <PasswordGeneratorOptions
        numWords={numWords}
        wordLength={wordLength}
        setNumWords={setNumWords}
        setWordLength={setWordLength}
        includeNumbers={includeNumbers}
        includeSymbols={includeSymbols}
        setIncludeNumbers={setIncludeNumbers}
        setIncludeSymbols={setIncludeSymbols}
      />
      <PasswordGeneratorButton onClick={handleGeneratePassword} />
      <PasswordField password={password} onCopyPassword={handleCopyPassword} />
    </div>
  );
};

const PasswordGeneratorOptions = ({ numWords, wordLength, setNumWords, setWordLength, includeNumbers, includeSymbols, setIncludeNumbers, setIncludeSymbols }) => {
  return (
    <div className="options">
      <NumberInput label="Number of Words:" value={numWords} onChange={setNumWords} />
      <NumberInput label="Word Length:" value={wordLength} onChange={setWordLength} />
      <CheckboxInput label="Include Numbers:" checked={includeNumbers} onChange={setIncludeNumbers} />
      <CheckboxInput label="Include Symbols:" checked={includeSymbols} onChange={setIncludeSymbols} />
    </div>
  );
};

const NumberInput = ({ label, value, onChange }) => {
  return (
    <div className="number-input">
      <label>{label}</label>
      <input type="number" value={value} onChange={(e) => onChange(parseInt(e.target.value))} />
    </div>
  );
};

const CheckboxInput = ({ label, checked, onChange }) => {
  return (
    <div className="checkbox-input">
      <label>{label}</label>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </div>
  );
};

const PasswordGeneratorButton = ({ onClick }) => {
  return (
    <button className="password-generator-button" onClick={onClick}>
      Generate Password
    </button>
  );
};

const PasswordField = ({ password, onCopyPassword }) => {
  return (
    <div className="password-field">
      <label>Password:</label>
      <Textarea value={password} readOnly />
      <CopyButton onClick={onCopyPassword} />
    </div>
  );
};

const Textarea = ({ value, readOnly }) => {
  return (
    <textarea className="password-textarea" value={value} readOnly />
  );
};

const CopyButton = ({ onClick }) => {
  return (
    <button className="password-copy-button" onClick={onClick}>
      Copy
    </button>
  );
};

export default Passwordgenerator;
