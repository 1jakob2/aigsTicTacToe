import React from "react";

interface TextInputProps {
    label: string;
    type: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const TextInput: React.FC<TextInputProps> = ({label, type, id, value, onChange, placeholder}) => {
    return (
        <div className="mb-3">
            <label className="form-label">
                {label}
            </label>
            <input
                type={type}
                className="form-control mb-3"
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}
export default TextInput;