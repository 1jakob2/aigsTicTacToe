import React, {useState} from 'react';
import {Container, Row, Button} from 'react-bootstrap';
import GameMessage from "./GameMessage.tsx";
import GameCell from "./GameCell.tsx";
import {checkWinner, isGridFull} from "../utils/gameUtils.ts";

const GameGrid: React.FC = () => {
    const gridSize = 3;

    const [grid, setGrid] = useState<string[][]>(
        Array(gridSize).fill(Array(gridSize).fill(""))
    );
    // X starts the game
    const [isXTurn, setIsXTurn] = useState<boolean>(true);
    const [winner, setWinner] = useState<string | null>(null);
    const [isDraw, setIsDraw] = useState<boolean>(false);
    const [winningCells, setWinningCells] = useState<number[][] | null>(null);


    const handleCellClick = (rowIndex: number, colIndex: number) => {
        // only execute if the cell is empty
        if (grid[rowIndex][colIndex] === "") {
            const newGrid = grid.map((row, rowI) => // rowI iterates through the three rows
                row.map((cell, colI) => ( // for each row, colI iterates through the three columns
                    // if the right position is found, "X" is returned, otherwise the cell is returned
                    rowI === rowIndex && colI === colIndex ? (isXTurn ? "X" : "O") : cell
                ))
            );
            setGrid(newGrid);
            const {winner: gameWinner, cells} = checkWinner(newGrid);
            if (gameWinner) { // null is a falsy value, therefore continue, "X" or "O" is a truthy value therefore a winner is found
                setWinner(gameWinner);
                setWinningCells(cells);
            } else if (isGridFull(newGrid)) {
                setIsDraw(true);
            } else {
                setIsXTurn(!isXTurn); // toggle
            }
        }
    }

    const resetGame = () => {
        setGrid(Array(gridSize).fill(Array(gridSize).fill("")));
        setWinner(null);
        setIsDraw(false);
        setIsXTurn(true);
        setWinningCells(null);
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Tic-Tac-Toe</h1>
            <div className="d-flex flex-column align-items-center">
                {grid.map((row, rowIndex) => (
                        <Row key={rowIndex} className="justify-content-center">
                            {row.map((cell, colIndex) => {
                                const isWinningCell = winningCells && // if winningCells is "", the condition will be false already here
                                    winningCells.some(([winRow, winCol]) => winRow === rowIndex && winCol === colIndex)
                                return (
                                    <GameCell key={colIndex}
                                              isWinningCell={!!isWinningCell}
                                              value={cell}
                                              disabled={!!winner}
                                              onClick={() => handleCellClick(rowIndex, colIndex)}
                                    />
                                );
                            })}
                        </Row>
                    )
                )}
            </div>
            <GameMessage winner={winner} isDraw={isDraw} isXTurn={isXTurn}/>
            <div className="text-center mt-4">
                <Button variant="primary" onClick={resetGame}>
                    Reset Game
                </Button>
            </div>
        </Container>
    )
}
export default GameGrid