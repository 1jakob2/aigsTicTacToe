import { useState, useEffect } from "react";
import { getFromLocalStorage, clearLocalStorage } from "@/utils/storage.ts";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = getFromLocalStorage("token");
        const userExpiry = getFromLocalStorage("userExpiry");

        if (token && userExpiry) {
            const isExpired = new Date().getDate() > new Date(userExpiry).getTime();
            setIsAuthenticated(!isExpired);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const logout = () => {
        clearLocalStorage("token");
        clearLocalStorage("userExpiry");
        clearLocalStorage("userName");
        setIsAuthenticated(false);
    };

    return { isAuthenticated, logout };
};
export default useAuth;