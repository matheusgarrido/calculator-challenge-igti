import React, { useState, useEffect } from 'react';
import Button from '../components/button';
import Display from '../components/display';
import '../style/style.css';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [isResult, setIsResult] = useState(false);
  const [value, setValue] = useState('0');
  const [previousValue, setPreviousValue] = useState('0');
  const [currentOperation, setCurrentOperation] = useState('');

  useEffect(() => {
    setDisplay(value);
  }, [value]);

  function calculate(previousValue, value) {
    previousValue = parseFloat(previousValue);
    value = parseFloat(value);
    console.log(currentOperation);
    console.log(previousValue);
    console.log(value);
    switch (currentOperation) {
      case '+':
        if (!previousValue) previousValue = 0;
        let sum = previousValue + value;
        setDisplay(sum + '');
        break;
      case '-':
        let sub = previousValue - value;
        setDisplay(sub + '');
        break;
      case '÷':
        if (value === 0) {
          setDisplay('0');
          break;
        }
        let div = previousValue / value;
        setDisplay(div + '');
        break;
      case 'x':
        let mult = previousValue * value;
        setDisplay(mult + '');
        break;
      case '√a':
        let root = Math.pow(previousValue, 1 / value);
        setDisplay(root + '');
        break;
      case 'a²':
        let exp = Math.pow(previousValue, value);
        setDisplay(exp + '');
        break;
    }
    setIsResult(true);
  }

  function onClickSignal(previousValue, newInput, value) {
    previousValue = parseFloat(previousValue);
    value = parseFloat(value);
    switch (newInput) {
      case '=':
        if (currentOperation) {
          calculate(previousValue, value);
          setPreviousValue(value + '');
          setCurrentOperation('');
        } else {
          setValue(value + '');
        }
        break;
      default: {
        setCurrentOperation(newInput);
        if (previousValue) {
          calculate(previousValue, value);
        } else {
          setPreviousValue(value + '');
          setValue('0');
        }
      }
    }
  }

  async function getButtonClick(newInput, newInputType) {
    let currentValue = value;
    let previous = previousValue;
    if (isResult) {
      previous = display;
      currentValue = '0';
      setPreviousValue(display);
      setValue('0');
      setDisplay('0');
      setIsResult(false);
    }
    let newValue = '0';
    switch (newInputType) {
      case 'signal':
        if (newInput == '%') {
          onClickSignal(previous, '=', parseFloat(currentValue) / 100 + '');
        } else {
          console.log(currentValue);
          console.log(currentOperation);
          if (currentValue === '0') setValue('-');
          else onClickSignal(previous, newInput, currentValue);
        }
        break;
      //Comma
      case 'comma':
        const splittedSize = currentValue.split(newInput).length;
        if (splittedSize === 1) newValue = currentValue + newInput;
        else newValue = currentValue;
        setValue(newValue);
        break;
      //Number
      case 'number':
        //Limit to 20 chars in display
        if (currentValue.length < 20) {
          //If is empty ignore zeros
          if ((currentValue === '0' || currentValue === '-0') && newInput === 0)
            break;
          //If starts with zero
          else if (
            currentValue[0] === '0' ||
            currentValue.substr(0, 2) === '-0'
          ) {
            console.log(isResult);
            console.log(currentValue);
            console.log(currentValue.substr(0, 2));
            //And has comma
            if (currentValue.split('.').length === 1) newValue = newInput + '';
            //And doesn't have comma
            else newValue = currentValue + '' + newInput;
          }
          //If not start with zero
          else newValue = currentValue + '' + newInput;
          setValue(newValue);
        }
        break;
      default:
        setValue(newValue);
        setPreviousValue(newValue);
        setCurrentOperation('');
    }
  }
  return (
    <div id="calculator">
      <Display value={display} />
      <section>
        <Button text={'√a'} type={'signal'} getButtonClick={getButtonClick} />
        <Button text={'a²'} type={'signal'} getButtonClick={getButtonClick} />
        <Button text={'%'} type={'signal'} getButtonClick={getButtonClick} />
        <Button text={'÷'} type={'signal'} getButtonClick={getButtonClick} />
        <Button text={7} type={'number'} getButtonClick={getButtonClick} />
        <Button text={8} type={'number'} getButtonClick={getButtonClick} />
        <Button text={9} type={'number'} getButtonClick={getButtonClick} />
        <Button text={'x'} type={'signal'} getButtonClick={getButtonClick} />
        <Button text={4} type={'number'} getButtonClick={getButtonClick} />
        <Button text={5} type={'number'} getButtonClick={getButtonClick} />
        <Button text={6} type={'number'} getButtonClick={getButtonClick} />
        <Button text={'-'} type={'signal'} getButtonClick={getButtonClick} />
        <Button text={1} type={'number'} getButtonClick={getButtonClick} />
        <Button text={2} type={'number'} getButtonClick={getButtonClick} />
        <Button text={3} type={'number'} getButtonClick={getButtonClick} />
        <Button text={'+'} type={'signal'} getButtonClick={getButtonClick} />
        <Button text={'C'} type={'clean'} getButtonClick={getButtonClick} />
        <Button text={0} type={'number'} getButtonClick={getButtonClick} />
        <Button text={'.'} type={'comma'} getButtonClick={getButtonClick} />
        <Button text={'='} type={'signal'} getButtonClick={getButtonClick} />
      </section>
    </div>
  );
}
