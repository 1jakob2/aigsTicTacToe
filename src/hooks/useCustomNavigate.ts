import {useLocation, useNavigate} from "react-router-dom";

const useCustomNavigate = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (
        path: string,
        options: {
            state?: Record<string, unknown>;
            includeCurrentLocation?: boolean
            replace?: boolean;
        }
        = {}) => {
        const {state = {}, includeCurrentLocation = false, replace = false} = options;

        const updatedState = includeCurrentLocation
            ? {...state, from: location.pathname}
            : state;

        navigate(path, {state: updatedState, replace});
    };
    return handleNavigate;
};
export default useCustomNavigate;