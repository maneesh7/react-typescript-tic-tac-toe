import React, { useState, useEffect, useImperativeHandle, Ref } from 'react';
import Square from './Square';
import './Board.scss';
import { IDefaultValues } from './Game';

type Props = {
  setWinnerName: Function;
  defaultNames: {
    first: string;
    second: string;
  };
  resetGame: Function;
};

export interface IProps {
  winner: {
    name: [];
    winArray: [];
  };
}

const Board: React.FC<Props> = ({ setWinnerName, defaultNames, resetGame }) => {
  const [squares, setSqaures] = useState<Array<string>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winningArray, setWinningArray] = useState<number[]>([]);

  useEffect(() => {
    const winner = calculateWinner();

    if (winner?.name) {
      setWinnerName(winner.name);
      setWinningArray(winner.winArray);
    }
  }, [squares]);

  const handleReset = (): void => {
    setSqaures(Array(9).fill(null));
    resetGame();
  };

  const updateValue = (index: number): void => {
    const sqr = squares.slice();
    sqr[index] = isXNext ? defaultNames.first : defaultNames.second;
    setIsXNext(!isXNext);
    setSqaures(sqr);
  };

  const calculateWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if ([a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { name: squares[a], winArray: [a, b, c] };
      }
    }
    return null;
  };

  return (
    <div className="board">
      <div className="sqrBoard">
        {squares.length > 0 &&
          squares.map((item, index) => {
            return (
              <Square
                key={index}
                value={item}
                updateValue={() => updateValue(index)}
                isWinnerBox={winningArray.includes(index)}
              />
            );
          })}
      </div>
      <button className="resetGame" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
};

export default Board;
