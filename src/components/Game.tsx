import React, { RefObject, useEffect, useRef, useState } from 'react';
import Board from './Board';
import './Game.scss';

export interface IDefaultValues {
  first: string;
  second: string;
}

const Game: React.FC = () => {
  const [winnerName, setWinnerName] = useState<string>('');
  const [firstDefaultValue, setFirstDefaultValue] = useState<string>('X');
  const [secondDefaultValue, setSecondDefaultValue] = useState<string>('O');

  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const startGame = (): void => {
    setGameStarted(true);
  };
  const resetGame = (): void => {
    setGameStarted(false);
  };

  const [defaultNames, setDefaultValues] = useState<IDefaultValues>({
    first: 'X',
    second: 'O'
  });

  useEffect(() => {
    console.log(defaultNames);
  }, [defaultNames]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setDefaultValues({ ...defaultNames, [e.target.name]: e.target.value });
  };

  return (
    <div className="game">
      <h3>Please choose initial values for X and O</h3>
      <div className="nameRow">
        <div className="nameLabel">First Player:</div>
        <input
          type="text"
          name="first"
          value={defaultNames.first}
          maxLength={1}
          onChange={handleChange}
          disabled={gameStarted}
        />
      </div>
      <div className="nameRow">
        <div className="nameLabel">Second Player:</div>
        <input
          type="text"
          name="second"
          value={defaultNames.second}
          maxLength={1}
          onChange={handleChange}
          disabled={gameStarted}
        />
      </div>

      {!gameStarted && (
        <button className="startGame" onClick={startGame}>
          Start Game
        </button>
      )}
      {winnerName != '' && <h2> Winner Name: {winnerName}</h2>}
      {gameStarted && (
        <Board
          setWinnerName={setWinnerName}
          defaultNames={defaultNames}
          resetGame={resetGame}
        />
      )}
    </div>
  );
};

export default Game;
