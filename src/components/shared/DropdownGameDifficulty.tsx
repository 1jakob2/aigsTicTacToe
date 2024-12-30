import useDropdown from "@/hooks/useDropdown.ts";
import React from "react";

const DropdownGameDifficulty: React.FC<{
    dropdown: ReturnType<typeof useDropdown>;
    onSelect: (value: string) => void;
    defaultValue?: string;
    widthClass: string;
}> = ({dropdown, onSelect, defaultValue, widthClass}) => {
    const {selectedValue, setSelectedValue, error} = dropdown;

    React.useEffect(() => {
        if (defaultValue && !selectedValue){
            setSelectedValue(defaultValue);
            onSelect(defaultValue);
        }
    }, [defaultValue, setSelectedValue, setSelectedValue, onSelect]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedValue(value);
        onSelect(value);
        console.log(value);
    };

    return (
        <div className="mb-3">
            <label htmlFor="dropdown" className="form-label">
                Choose a difficulty level for your game:
            </label>
            <select
                id="dropdown"
                className={`form-select ${widthClass} ${error ? "is-invalid" : ""}`}
                value={selectedValue}
                onChange={handleChange}
            >
                <option value="" disabled>Select...</option>
                <option value="1">Medium</option>
                <option value="2">Hard</option>
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
export default DropdownGameDifficulty;