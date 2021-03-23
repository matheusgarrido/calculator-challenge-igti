import React from 'react';

export default function Button({ text, type, getButtonClick, title }) {
  function handleClick() {
    // const newInput = event.target.textContent;
    getButtonClick(text, type);
  }
  return (
    <div className={type} onClick={handleClick} title={title}>
      {text}
    </div>
  );
}
