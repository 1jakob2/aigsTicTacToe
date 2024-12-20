import React from "react";

interface GameCellProps {
    value: string;
    isWinningCell: boolean;
    disabled: boolean;
    onClick: () => void;
}

const GameCell: React.FC<GameCellProps> = ({value, isWinningCell, disabled, onClick}) => {
    return (
        <div className={`border d-flex align-items-center justify-content-center ${
                isWinningCell ? 'bg-success text-white' : ``
            }`}
             style={{
                 height: "100px",
                 width: "100px",
                 cursor: value === "" && !disabled ? "pointer" : "not-allowed",
                 fontSize: "2rem",
             }}
             onClick={() => {
                 if (!disabled) onClick()
             }}>
            {value}
        </div>
    );
};
export default GameCell