import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ParcelSearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export const ParcelSearchBar = ({ onSearch, initialValue = '' }: ParcelSearchBarProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="relative flex-1 max-w-lg">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Search size={18} />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
        placeholder="Rechercher par UID ou adresse..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          onClick={() => setValue('')}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};
