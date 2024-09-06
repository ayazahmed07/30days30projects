"use client"

import React, { useState, useEffect, } from 'react';
import './Calculator.css'; // Optional: for custom styling

const Calculator = () => {
  const [input, setInput] = useState(''); // Stores the user input
  const [result, setResult] = useState(''); // Stores the result of the calculation

  // Function to handle button clicks
  const handleClick = (value: any) => {
    setInput((prev) => prev + value);
  };

  // Function to clear the input
  const clearInput = () => {
    setInput('');
    setResult('');
  };

  // Function to calculate the result
  const calculate = () => {
    try {
      // Using eval is not recommended for production code due to security risks,
      // but for a simple calculator, we can use it to evaluate the expression.
      const evalResult = eval(input);
      setResult(evalResult);
    } catch (error) {
      setResult('Error');
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
  
      if ((key >= '0' && key <= '9') || ['+', '-', '*', '/'].includes(key)) {
        setInput((prev) => prev + key);
      } else if (key === 'Enter') {
        calculate();
      } else if (key === 'Backspace') {
        setInput((prev) => prev.slice(0, -1));
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [input]);

  return (
    <div className="calculator">
      <div className="calculator-display">
        <p>{input || '0'}</p>
        <p>{result ? `= ${result}` : ''}</p>
      </div>
      <div className="calculator-buttons">
        <button onClick={clearInput}>C</button>
        <button onClick={() => handleClick('/')}>/</button>
        <button onClick={() => handleClick('*')}>*</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('+')}>+</button>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button key={num} onClick={() => handleClick(num.toString())}>
            {num}
          </button>
        ))}
        <button onClick={calculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
