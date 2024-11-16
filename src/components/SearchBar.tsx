import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <input
      type="text"
      placeholder="Buscar..."
      className="border p-2 rounded w-full"
    />
  );
};

export default SearchBar;
