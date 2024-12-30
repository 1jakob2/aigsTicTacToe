import React, {useState} from 'react';
import {Container, Row, Button} from 'react-bootstrap';
import GameMessage from "./GameMessage.tsx";
import GameCell from "./GameCell.tsx";
import {checkWinner, isGridFull} from "@/utils/gameUtils.ts";
import {getFromLocalStorage} from "@/utils/storage.ts";
import {gameMove} from "@/utils/api.ts";
import {toast} from "react-toastify";
import {useSearchParams} from "react-router-dom";
import useStartComputerGame from "@/hooks/useStartComputerGame.ts";
import DropdownGameDifficulty from "@/components/shared/DropdownGameDifficulty.tsx";
import useDropdown from "@/hooks/useDropdown.ts";
import useAuthRedirect from "@/hooks/useAuthRedirect.ts";
import useCustomNavigate from "@/hooks/useCustomNavigate.ts";

const GameGrid: React.FC = () => {
    const gridSize = 3;
    const [searchParams, setSearchParams] = useSearchParams();
    const mode = searchParams.get("mode");
    const initialDifficulty = searchParams.get("difficulty") || "";

    const [grid, setGrid] = useState<string[][]>(
        Array(gridSize).fill(Array(gridSize).fill(""))
    );
    // X starts the game
    const [isXTurn, setIsXTurn] = useState<boolean>(true);
    const [winner, setWinner] = useState<string | null>(null);
    const [isDraw, setIsDraw] = useState<boolean>(false);
    const [winningCells, setWinningCells] = useState<number[][] | null>(null);
    const token = getFromLocalStorage("token");
    const { startComputerGame, difficulty, setDifficulty } = useStartComputerGame();
    const dropdown = useDropdown();
    const handleNavigate = useCustomNavigate();
    useAuthRedirect();


    const handleCellClick = (rowIndex: number, colIndex: number) => {
        // only execute if the cell is empty
        if (mode === "local") {
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
        } else if (mode === "computer") {
            handleComputerMove(rowIndex, colIndex);
        }
    };

    const handleComputerMove = async (rowIndex: number, colIndex: number) => {
        if (!token){
            return;
        }

        try {
            const response = await gameMove({token, row: rowIndex.toString(), col: colIndex.toString()});
            const newGrid = response.board.map(row => row.map(cell => cell === 1 ? "X" : cell === -1 ? "O" : ""));
            setGrid(newGrid);

            const {winner, cells} = checkWinner(newGrid);

            if (winner) {
                setWinner(winner);
                setWinningCells(cells);
            }else if (isGridFull(newGrid)) {
                setIsDraw(true);
            }
        } catch (error) {
            console.log("Error with computers move", error);
            toast.error("Computer move error");
        }
    }

    const resetGame = async () => {
        setGrid(Array(gridSize).fill(Array(gridSize).fill("")));
        setWinner(null);
        setIsDraw(false);
        setIsXTurn(true);
        setWinningCells(null);

        if (mode === "computer") {
            await startComputerGame(difficulty);
            setSearchParams({ ...Object.fromEntries(searchParams.entries()), difficulty: difficulty });
        }
    };

    return (
        <Container className="mt-5">
            <div className="d-flex align-items-center justify-content-between">
                <Button variant="primary" onClick={() => {
                    handleNavigate("/");
                }}>
                    Back to Home
                </Button>
                <h1 className="text-center">
                    Tic-Tac-Toe
                </h1>
                <div style={{width: "100px"}}></div>
            </div>
            {mode === "computer" && <div className="d-flex justify-content-center">
                <DropdownGameDifficulty
                    dropdown={dropdown}
                    onSelect={(difficulty: string) => setDifficulty(difficulty)}
                    defaultValue={initialDifficulty}
                    widthClass="w-50"
                />
            </div>}
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
                <Button variant="primary" onClick={() => {
                    resetGame();
                }}>
                    Reset Game
                </Button>
            </div>
        </Container>
    )
}
export default GameGrid