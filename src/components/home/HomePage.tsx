import React, {useState} from "react";
import useCustomNavigate from "@/hooks/useCustomNavigate";
import "@/App.css";
import useAuth from "@/hooks/useAuth";
import { getFromLocalStorage } from "@/utils/storage";
import axios from "axios";
import { toast } from "react-toastify";
import {logoutUser} from "@/utils/api.ts";
import DropdownGameDifficulty from "@/components/shared/DropdownGameDifficulty.tsx";
import ButtonPlayNow from "@/components/home/ButtonPlayNow.tsx";
import useDropdown from "@/hooks/useDropdown.ts";
import useStartComputerGame from "@/hooks/useStartComputerGame.ts";

const HomePage: React.FC = () => {
    const handleNavigate = useCustomNavigate();
    const {isAuthenticated, logout} = useAuth();
    const userName = getFromLocalStorage("userName");
    const dropdowns = {
        playComputer: useDropdown(),
        playUser: useDropdown(),
    };
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
    const { startComputerGame } = useStartComputerGame();


    const handleAuthAction = async () => {
        if (isAuthenticated) {
            try {
                if (!userName) {
                    throw new Error("User not logged in. Cannot perform logout.");
                }
                const response = await logoutUser({userName});
                console.log(response);
                logout();
                toast.success("You have successfully logged out!");
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    console.error("Logout Failed:", err);
                    toast.error(err.message || "Logout failed, please try again.");
                } else {
                    console.error("Unexpected error:", err);
                    toast.error("An unexpected error occurred. Please try again.");
                }
            }
        } else {
            handleNavigate("/login");
        }
    };

    const handleNavigateToGame = async (mode: "local" | "computer", difficulty?: string) => {
        if (mode === "computer" && difficulty) {
            await startComputerGame(difficulty);
            handleNavigate("/game?mode=computer&difficulty=" + difficulty);
        } else {
            handleNavigate("/game?mode=local");
        }
    }

    return (
        <div className="container mt-5">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center">
                <h1>Welcome{userName ? `, ${userName}` : " to TicTacToe"}</h1>
                <button
                    className={`btn ${isAuthenticated ? "btn-danger" : "btn-primary"}`}
                    onClick={handleAuthAction}
                >
                    {isAuthenticated ? "Logout" : "Login"}
                </button>
            </div>

            {/* Game Mode Section */}
            <div className="mt-5">
                <h3>Choose a Game Mode:</h3>
                <div className="list-group mt-3">
                    <div className="list-group-item">
                        <h4>Two players on the same screen</h4>
                        <p>
                            Play with a friend on the same device. Take turns and see who can
                            outsmart the other!
                        </p>
                        <button
                            className="btn btn-secondary"
                            onClick={() => handleNavigateToGame("local")}
                        >
                            Play Now
                        </button>
                    </div>
                    <div className="list-group-item">
                        <h4>Play against the computer</h4>
                        <p>
                            Test your skills against an AI opponent and see if you can win!
                        </p>
                        <DropdownGameDifficulty
                            dropdown={dropdowns.playComputer}
                            onSelect={(difficulty: string) => setSelectedDifficulty(difficulty)}
                            widthClass="w-25"
                        />
                        <ButtonPlayNow
                            dropdown={dropdowns.playComputer}
                            onClick={() => {
                                if (selectedDifficulty) {
                                    handleNavigateToGame("computer", selectedDifficulty);
                                } else {
                                    console.error("No difficulty selected");
                                }
                            }
                        }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};
export default HomePage;