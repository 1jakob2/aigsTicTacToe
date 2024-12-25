import React from "react";
import useDropdownDifficulty from "@/hooks/useDropdownDifficulty.ts";
import useCustomNavigate from "@/hooks/useCustomNavigate.ts";

const ButtonPlayComputer: React.FC<{ dropdown: ReturnType<typeof useDropdownDifficulty>}> = ({dropdown}) => {
    const {selectedValue, validate} = dropdown;
    const handleNavigate = useCustomNavigate();

    const handleSubmit = () => {
        if (validate()) {
            console.log("Selected Value for API:", selectedValue);
            handleNavigate("/?")
        }
    };

    return (
        <div>
            <button
                className="btn btn-secondary"
                onClick={handleSubmit}
            >
                Play Now
            </button>
        </div>
    );
};
export default ButtonPlayComputer;