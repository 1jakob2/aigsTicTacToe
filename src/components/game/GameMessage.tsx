import React from "react";

interface GameMessageProps {
    winner: string | null;
    isDraw: boolean;
    isXTurn: boolean;
}

const GameMessage: React.FC<GameMessageProps> = ({winner, isDraw, isXTurn}) => {
    return (
        <h3 className="text-center mt-4">
            {winner
                ? `Player ${winner} wins!`
                : isDraw ? "It's a Draw"
                    : `${isXTurn ? "Player X's Turn" : "Player O's Turn"}`}
        </h3>
    );
};
export default GameMessage;