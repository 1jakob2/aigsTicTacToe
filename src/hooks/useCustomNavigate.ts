import {useNavigate} from "react-router-dom";

const useCustomNavigate = () => {
    const navigate = useNavigate();

    const handleNavigate = (
        path: string,
        options: {
            state?: Record<string, unknown>;
            includeCurrentLocation?: boolean
        }
        = {}) => {
        const {state = {}, includeCurrentLocation = false} = options;

        const updatedState = includeCurrentLocation
            ? {...state, from: location.pathname}
            : state;

        navigate(path, {state: updatedState});
    };
    return handleNavigate;
};
export default useCustomNavigate;