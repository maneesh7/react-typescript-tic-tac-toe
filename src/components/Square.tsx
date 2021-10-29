import React, { useState } from 'react';
import './Square.scss';

interface ISquareProps {
  value: string;
  updateValue: Function;
  isWinnerBox: Boolean;
}

const Square: React.FC<ISquareProps> = ({
  value,
  updateValue,
  isWinnerBox
}) => {
  return (
    <button
      className={isWinnerBox ? 'square winner' : 'square'}
      onClick={() => updateValue()}
    >
      {value}
    </button>
  );
};

export default Square;
