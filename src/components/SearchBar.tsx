import { useState } from "react";
import type { ChangeEvent } from "react";

type SearchBarProps = {
    onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="relative w-full max-w-md">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Busca tu dragón..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-indigo-900 text-sm text-rose-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
        </div>
    );
}
