import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:50005",
    headers: {
        "Content-Type": "application/json",
    },
});

export const registerUser = async (data: {userName: string, password: string}) => {
    const response = await apiClient.post("/users/register", data);
    return response.data;
};

export const loginUser = async (data: {userName: string, password: string}) => {
    const response = await apiClient.post("/users/login", data);
    const responseData = response.data;

    if (responseData.error) {
        throw new Error(responseData.error_description || "Login failed.");
    }
    return responseData;
};

export const logoutUser = async (data: {userName: string}) => {
    const response = await apiClient.post("/users/logout", data);
    return response.data;
};

export const getAllUsers = async () => {
    const response = await apiClient.get("/users");
    return response.data;
};

export const newGame = async (data: {token: string, gameType: string, difficulty: string}) => {
    const response = await apiClient.post("/game/new", data);
    return response.data;
};

type Board = [[number, number, number], [number, number, number], [number, number, number]];

type GameMoveResponse = {
    board: Board;
    difficulty: number;
    gameType: string;
    options: string | null;
    result: boolean;
    token: string;
};


export const gameMove = async (data: {token: string, row: string, col: string}): Promise<GameMoveResponse> => {
    const response = await apiClient.post<GameMoveResponse>("/game/move", data);
    return response.data;
};