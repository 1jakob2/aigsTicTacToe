import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import useForm from "@/hooks/useForm.ts";
import TextInput from "./TextInput.tsx";
import {loginUser} from "@/utils/api.ts";
import {saveToLocalStorage} from "@/utils/storage.ts";
import useCustomNavigate from "@/hooks/useCustomNavigate.ts";
import axios from "axios";
import {toast} from "react-toastify";

const LoginForm: React.FC = () => {
    const {userName, setUserName, password, setPassword, error, setError, validateUser, hashPassword} = useForm({});
    const [success, setSuccess] = useState(false);
    const handleNavigate = useCustomNavigate();
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevents the browser from reloading the page

        if (validateUser()) {
            try {
                const hashedPassword = await hashPassword(password);
                const {token, userExpiry} = await loginUser({userName, password: hashedPassword});
                console.log("Form submitted!");
                toast.success("Login successful");
                saveToLocalStorage("token", token);
                saveToLocalStorage("userExpiry", userExpiry);
                saveToLocalStorage("userName", userName);
                setSuccess(true);

                //const redirectTo = location.state?.from || "/";
                handleNavigate(redirect, {replace: true});
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    console.error("Login Failed:", err);
                    setError(err.response?.data?.message || "Login failed, please try again.");
                } else if (err instanceof Error) {
                    console.error("Custom error:", err.message);
                    setError(err.message || "An error occurred during login.");
                } else {
                    console.error("Unexpected error:", err);
                    setError("An unexpected error occurred. Please try again.");
                }
            }
        }
    };

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
                <div className="mt-4">
                    <p>
                        No account yet?{" "}
                        <span
                            className="text-primary text-decoration-underline"
                            onClick={() => handleNavigate("/register")}
                            style={{cursor: "pointer"}}
                        >
                            Register here
                        </span>
                    </p>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>
        </div>
    );
};
export default LoginForm;