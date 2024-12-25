import React from "react";
import useCustomNavigate from "@/hooks/useCustomNavigate";
import "@/App.css";
import useAuth from "@/hooks/useAuth";
import { getFromLocalStorage } from "@/utils/storage";
import axios from "axios";
import { toast } from "react-toastify";
import {logoutUser} from "@/utils/api.ts";

const HomePage: React.FC = () => {
    const handleNavigate = useCustomNavigate();
    const {isAuthenticated, logout} = useAuth();
    const userName = getFromLocalStorage("userName");

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
                            onClick={() => handleNavigate("/game")}
                        >
                            Play Now
                        </button>
                    </div>
                    <div className="list-group-item">
                        <h4>Two logged in users play each other</h4>
                        <p>
                            Challenge another logged-in user in an exciting online match!
                        </p>
                        <button
                            className="btn btn-secondary"
                            onClick={() => handleNavigate("/?")}
                        >
                            Play Now
                        </button>
                    </div>
                    <div className="list-group-item">
                        <h4>Play against the computer</h4>
                        <p>
                            Test your skills against an AI opponent and see if you can win!
                        </p>
                        <button
                            className="btn btn-secondary"
                            onClick={() => handleNavigate("/?")}
                        >
                            Play Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default HomePage;