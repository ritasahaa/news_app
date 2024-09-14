import React, { useState } from 'react';
import './FilterForm.css';

const FilterForm = ({ queryParams, updateQueryParams }) => {
  const [formValues, setFormValues] = useState(queryParams);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateQueryParams(formValues);
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="q">Search:</label>
        <input
          type="text"
          id="q"
          name="q"
          value={formValues.q}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <select
          id="country"
          name="country"
          value={formValues.country}
          onChange={handleChange}
        >
          <option value="india">India</option>
          <option value="us">US</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="sortby">Sort By:</label>
        <select
          id="sortby"
          name="sortby"
          value={formValues.sortby}
          onChange={handleChange}
        >
          <option value="publishedAt">Published At</option>
          <option value="relevance">Relevance</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="max">Max Results:</label>
        <input
          type="number"
          id="max"
          name="max"
          min="1"
          max="50"
          value={formValues.max}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Filter</button>
    </form>
  );
};

export default FilterForm;
