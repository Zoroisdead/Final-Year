import { useState } from "react";


const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
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
              placeholder="Search..."
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
