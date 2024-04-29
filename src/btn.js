import React from 'react';
import './btn.css';

function Btn({ onClick }) {
  return (
    <button id="voiceBtn" className="Btn" onClick={onClick}>Hablameee</button>
  );
}

export default Btn;
