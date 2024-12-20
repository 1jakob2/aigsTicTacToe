import {useState} from 'react';

interface UseFormProps {
    initialUserName?: string;
    initialPassword?: string;
    initialRepeatPassword?: string;
}

const useForm = ({
                     initialUserName = "",
                     initialPassword = "",
                     initialRepeatPassword = ""
                 }: UseFormProps) => {
    const [userName, setUserName] = useState<string>(initialUserName);
    const [password, setPassword] = useState<string>(initialPassword);
    const [repeatPassword, setRepeatPassword] = useState<string>(initialRepeatPassword);
    const [error, setError] = useState<string | null>(null);

    const validateRegistration = (): boolean => {
        setError(null);

        // validate username
        validateUsername();

        // validate password
        if (password.length < 4) {
            setError("Password must be at least 4 characters long");
            return false;
        }

        if (password !== repeatPassword) {
            setError("Passwords do not match");
            return false;
        }

        return true;
    };

    const validateUser = (): boolean => {
        setError(null);

        validateUsername();

        if (!password.trim()) {
            setError("Password is required");
            return false;
        }

        return true;
    }

    const validateUsername = (): boolean => {
        setError(null);

        if (!userName.trim()) {
            setError("Username is required");
            return false;
        }

        return true;
    }

    return {
        userName,
        setUserName,
        password,
        setPassword,
        repeatPassword,
        setRepeatPassword,
        error,
        setError,
        validateRegistration,
        validateUser
    };
};
export default useForm;