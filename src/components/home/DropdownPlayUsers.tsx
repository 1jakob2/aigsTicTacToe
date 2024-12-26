import React, {useState, useEffect} from "react";
import useDropdown from "@/hooks/useDropdown.ts";
import {getAllUsers} from "@/utils/api.ts";
import {toast} from "react-toastify";
import { getFromLocalStorage } from "@/utils/storage";

interface User {
    userName: string;
}

const DropdownPlayUsers: React.FC<{ dropdown: ReturnType<typeof useDropdown>}> = ({dropdown}) => {
    const {selectedValue, setSelectedValue, error} = dropdown;
    const [options, setOptions] = useState<{ userName: string} []>([]);
    const loggedInUser = getFromLocalStorage("userName");

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data: User[] = await getAllUsers();
                const filteredData = data.filter((user) => user.userName !== loggedInUser);
                const transformedOptions = filteredData.map((user) => ({
                    userName: user.userName,
                }));
                setOptions(transformedOptions);
            } catch (error) {
                console.error("Error fetching users", error);
                toast.error("Error fetching users");
            }
        };
        fetchData();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedValue(value);
        console.log(value);
    };

    return (
        <div className="mb-3">
            <label htmlFor="dynamic-dropdown" className="form-label">
                Choose a player you want to play against:
            </label>
            <select
                id="dynamic-dropdown"
                className={`form-select w-25 ${error ? "is-invalid" : ""}`}
                value={selectedValue}
                onChange={handleChange}
            >
                <option value="" disabled>Select...</option>
                {options.map((option) => (
                    <option key={option.userName} value={option.userName}>
                        {option.userName}
                    </option>
                ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
export default DropdownPlayUsers;