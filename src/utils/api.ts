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
    return response.data;
};