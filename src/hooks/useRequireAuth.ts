import useAuth from "@/hooks/useAuth.ts";
import useCustomNavigate from "@/hooks/useCustomNavigate.ts";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";

const useRequireAuth = () => {
    const {isAuthenticated} = useAuth();
    const handleNavigate = useCustomNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            handleNavigate("/login", {state: {from: location.pathname}});
        }
    }, [isAuthenticated, location, handleNavigate]);
    return isAuthenticated;
};
export default useRequireAuth;