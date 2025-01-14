import { useState } from "react";

const Header = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Passing search term to parent component
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    onFilter(e.target.value); // Passing filter to parent component
  };

  return (
    <div className="header">
      <div className="vi-flex-container">
        <div style={{ flexGrow: "1" }}>
          {/* Search and Filter Options */}
          <div className="header-controls">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by bike name..."
              className="search-input"
            />
            <select
              value={filter}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Filter</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
