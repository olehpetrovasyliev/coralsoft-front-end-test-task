import React, { useState } from "react";

const Filters = ({ onSortChange, onFilterChange }) => {
  const [sort, setSort] = useState("name"); // Default sorting by name
  const [filter, setFilter] = useState("");

  const handleSortChange = (e) => {
    setSort(e.target.value);
    onSortChange(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div className="flex space-x-4 mb-4">
      <div>
        <label className="block">Sort By</label>
        <select
          onChange={handleSortChange}
          value={sort}
          className="p-2 border rounded"
        >
          <option value="name">Name</option>
          <option value="affection_level">Affection Level</option>
          <option value="adaptability">Adaptability</option>
          <option value="life_span">Life Span</option>
        </select>
      </div>

      <div>
        <label className="block">Filter by Origin</label>
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border rounded"
          placeholder="Enter breed origin"
        />
      </div>
    </div>
  );
};

export default Filters;
