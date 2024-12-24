import { useNavigate } from "react-router-dom";

const useCustomNavigate = () => {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
    }
    return handleNavigate;
};
export default useCustomNavigate;