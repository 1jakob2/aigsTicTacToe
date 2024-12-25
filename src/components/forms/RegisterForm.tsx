import React, {useState} from "react";
import TextInput from "./TextInput.tsx";
import useForm from "@/hooks/useForm.ts";
import {registerUser} from "@/utils/api.ts";
import useCustomNavigate from "@/hooks/useCustomNavigate.ts";
import axios from "axios";

const RegisterForm: React.FC = () => {
    const {
        userName,
        setUserName,
        password,
        setPassword,
        repeatPassword,
        setRepeatPassword,
        error,
        setError,
        validateRegistration,
        hashPassword
    } = useForm({});
    const [success, setSuccess] = useState<boolean>(false);
    const handleNavigate = useCustomNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevents the browser from reloading the page

        if (validateRegistration()) {
            try {
                const hashedPassword = await hashPassword(password);
                const response = await registerUser({userName, password: hashedPassword});
                console.log("Form submitted!", response);
                setSuccess(true);

                setTimeout(() => {
                    handleNavigate("/login");
                }, 1000);
            } catch (err: unknown) {
                if (axios.isAxiosError(err)){
                    console.error("Registration Failed:", err);
                    setError(err.response?.data?.message || "Registration failed, please try again.");
                } else {
                    console.error("Unexpected error:", err);
                    setError("An unexpected error occurred. Please try again.");
                }
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Register</h2>
            <form onSubmit={handleSubmit} className="mx-auto" style={{maxWidth: "400px"}}>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">Registration Successful!</div>}
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
                    <TextInput
                        label="Repeat Password"
                        type="password"
                        id="repeatPassword"
                        value={repeatPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepeatPassword(e.target.value)}
                        placeholder="Confirm your password again"
                    />
                </div>
                <div className="mt-4">
                    <p>
                        Already have an account?{" "}
                        <span
                            className="text-primary text-decoration-underline"
                            onClick={() => handleNavigate("/login")}
                            style={{cursor: "pointer"}}
                        >
                            Login here
                        </span>
                    </p>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Register
                </button>
            </form>
        </div>
    );
};
export default RegisterForm;