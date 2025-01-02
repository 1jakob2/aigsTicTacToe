import React from "react";
import useDropdown from "@/hooks/useDropdown.ts";
import useCustomNavigate from "@/hooks/useCustomNavigate.ts";

const ButtonPlayNow: React.FC<{ dropdown: ReturnType<typeof useDropdown>, onClick: () => void }> = ({
                                                                                                        dropdown,
                                                                                                        onClick
                                                                                                    }) => {
    const {selectedValue, validate} = dropdown;
    const handleNavigate = useCustomNavigate();

    const handleSubmit = () => {
        if (validate()) {
            onClick();
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