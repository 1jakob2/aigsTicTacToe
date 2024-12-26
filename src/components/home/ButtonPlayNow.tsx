import React from "react";
import useDropdown from "@/hooks/useDropdown.ts";
import useCustomNavigate from "@/hooks/useCustomNavigate.ts";

const ButtonPlayNow: React.FC<{ dropdown: ReturnType<typeof useDropdown>}> = ({dropdown}) => {
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
export default ButtonPlayNow;