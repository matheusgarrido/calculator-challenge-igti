import React from 'react';

export default function Display({ value, getButtonClick }) {
  return (
    <main onClick={handleClickToCopy} title={'Click to copy'}>
      <input
        value={value || 0}
        autoFocus
        onKeyDown={handleInput}
        onBlur={handleFocus}
      />
    </main>
  );

  //When key down
  function handleInput(event) {
    const { key } = event;
    if (isFinite(parseInt(key))) getButtonClick(key, 'number');
    else
      switch (key.toLowerCase()) {
        //To comma/dot
        case ',':
        case '.':
          getButtonClick('.', 'comma');
          break;
        //To calculate
        case '=':
        case 'enter':
        case ' ':
          getButtonClick('=', 'signal');
          break;
        //To add
        case 'a':
        case '+':
          getButtonClick('+', 'signal');
          break;
        //To subtrat
        case 's':
        case '-':
          getButtonClick('-', 'signal');
          break;
        //To multiply
        case 'x':
        case '*':
          getButtonClick('x', 'signal');
          break;
        //To divide
        case 'd':
        case '/':
          getButtonClick('÷', 'signal');
          break;
        //To get root
        case 'r':
        case '#':
          getButtonClick('√a', 'signal');
          break;
        //To get exponentiation
        case 'e':
        case '^':
          getButtonClick('a²', 'signal');
          break;
        //To get percentage
        case 'p':
        case '%':
          getButtonClick('%', 'signal');
          break;
        //To clean
        case 'backspace':
        case 'escape':
        case 'delete':
        case 'c':
          getButtonClick('C', 'clean');
          break;
      }
  }
  //Always focused
  function handleFocus(event) {
    event.target.focus();
  }

  function handleClickToCopy() {
    try {
      const valueToCopy = document.querySelector('input');
      valueToCopy.select();
      document.execCommand('copy');
      alert(`Value ${value} copied`);
    } catch (err) {
      console.log(err);
    }
  }
}
