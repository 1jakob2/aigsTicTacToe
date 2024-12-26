import {useState} from "react";

const useDropdown = (initialValue = "") => {
    const [selectedValue, setSelectedValue] = useState<string>(initialValue);
    const [error, setError] = useState<string>("");

    const validate = () => {
        if (!selectedValue) {
            setError("Please select an option");
            return false;
        }
        setError("");
        return true;
    };

    return {
        selectedValue,
        setSelectedValue,
        error,
        validate
    };
};
export default useDropdown;