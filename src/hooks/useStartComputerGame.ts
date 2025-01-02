import {newGame} from "@/utils/api.ts";
import {toast} from "react-toastify";
import {useState} from "react";


const useStartComputerGame = () => {
    const [isLoading, setLoading] = useState(false);
    const [difficulty, setDifficulty] = useState<string>("");

    const startComputerGame = async (difficulty: string) => {
        const token = localStorage.getItem("token");
        setDifficulty(difficulty);

        try {
            if (!token) {
                return new Error("No token provided");
            }
            setLoading(true);
            await newGame({token, gameType: "TicTacToe", difficulty});
            setLoading(false);
        } catch (error) {
            console.error("Error starting the game", error);
            toast.error("Error starting the game");
            setLoading(false);
        }
    };
    return {startComputerGame, isLoading, difficulty, setDifficulty};

};
export default useStartComputerGame;