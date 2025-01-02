export const checkWinner = (grid: string[][]): { winner: string | null, cells: number[][] | null } => {
    const gridSize = grid.length;
    for (let i = 0; i < gridSize; i++) {
        // Check rows, grid[i][0] if i == 0 then we're top left
        // if a cell holds an empty string "", then the if-clause won't execute because "" is falsy
        // if-clause checks if all cells hold the same value ("O" or "X")
        if (
            grid[i][0] && //
            grid[i][0] === grid[i][1] &&
            grid[i][1] === grid[i][2]
        ) {
            return {winner: grid[i][0], cells: [[i, 0], [i, 1], [i, 2]]}; // Return "O" or "X"
        }

        // Check columns
        if (
            grid[0][i] &&
            grid[0][i] === grid[1][i] &&
            grid[1][i] === grid[2][i]
        ) {
            return {winner: grid[0][i], cells: [[0, i], [1, i], [2, i]]};
        }
    }

    // Check diagonal top-left to bottom-right
    if (
        grid[0][0] &&
        grid[0][0] === grid[1][1] &&
        grid[1][1] === grid[2][2]
    ) {
        return {winner: grid[0][0], cells: [[0, 0], [1, 1], [2, 2]]};
    }

    // Check diagonal top-right to bottom-left
    if (
        grid[0][2] &&
        grid[0][2] === grid[1][1] &&
        grid[1][1] === grid[2][0]
    ) {
        return {winner: grid[0][2], cells: [[0, 2], [1, 1], [2, 0]]};
    }

    return {winner: null, cells: null};
};

// returns true if every cell is not empty
export const isGridFull = (newGrid: string[][]) => {
    return newGrid.every(row => row.every(cell => cell !== ""))
};