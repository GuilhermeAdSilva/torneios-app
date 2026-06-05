import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
    const [value, setValue] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (onSearch) onSearch(value);
    }

    return (
        <form className="searchbar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Buscar..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="searchInput"
            />

            <button type="submit" className="searchButton">
                <Search size={20} />
            </button>
        </form>
    );
}