import useCustomNavigate from "@/hooks/useCustomNavigate.ts";
import {getFromLocalStorage} from "@/utils/storage.ts";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";


const useAuthRedirect = (shouldRedirect: boolean) => {
    const handleNavigate = useCustomNavigate();
    const location = useLocation();
    const token = getFromLocalStorage("token");

    useEffect(() => {
        if (shouldRedirect) {
            if (!token) {
                const redirectPath = `${location.pathname}${location.search}`;
                handleNavigate(`/login?redirect=${encodeURIComponent(redirectPath)}`, {replace: true});
            }
        }
    }, [handleNavigate, location, token]);
};
export default useAuthRedirect;