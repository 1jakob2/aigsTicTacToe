import React, {useState} from "react";
import useForm from "../../hooks/useForm.ts";
import TextInput from "./TextInput.tsx";
import {loginUser} from "../../utils/api.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const LoginForm: React.FC = () => {
    const {userName, setUserName, password, setPassword, error, setError, validateUser} = useForm({});
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevents the browser from reloading the page

        if (validateUser()) {
            try {
                const response = await loginUser({userName, password});
                console.log("Form submitted!", response);
                setSuccess(true);
                navigate("/game");
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    console.error("Login Failed:", err);
                    setError(err.response?.data?.message || "Login failed, please try again.");
                } else {
                    console.error("Unexpected error:", err);
                    setError("An unexpected error occurred. Please try again.");
                }
            }
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleSubmit} className="mx-auto" style={{maxWidth: "400px"}}>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">Login Successful!</div>}
                <div className="mb-3">
                    <TextInput
                        label="Username"
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                        placeholder="Enter your username"
                    />
                    <TextInput
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>
        </div>
    );
};
export default LoginForm;