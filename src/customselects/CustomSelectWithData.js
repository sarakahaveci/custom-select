import React, { useState } from 'react';
import { Select, Input, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import './CustomSelectWithData.css';

const { Option } = Select;

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Oops! Something went wrong while fetching data.');
  }
  return response.json();
};

const CustomSelectWithData = () => {
  const [filter, setFilter] = useState('');
  const [sortAscending, setSortAscending] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  const { data: options = [], isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // Show loading state
  if (isLoading) {
    return <p>Loading options, please wait...</p>;
  }

  // Handle error state
  if (isError) {
    return <p>Failed to load options. Please try again later.</p>;
  }

  // Filter options based on user input
  const filteredOptions = filter
    ? options.filter(option => option.title.toLowerCase().includes(filter.toLowerCase()))
    : options;

  // Sort options if needed
  const sortedOptions = sortAscending
    ? [...filteredOptions].sort((a, b) => a.title.localeCompare(b.title))
    : filteredOptions;

  // Toggle sorting order
  const toggleSort = () => setSortAscending(prev => !prev);

  return (
    <div className="custom-select-wrapper">
      <label className="select-label">Select a Team Member</label>
      
      <Input
        className="filter-input"
        placeholder="Search for a team member..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <Button onClick={toggleSort} style={{ marginBottom: '10px' }}>
        {sortAscending ? 'Sort: A-Z' : 'Sort: Z-A'}
      </Button>

      <Select
        mode="multiple"
        placeholder="Choose team members"
        onChange={(value) => setSelectedValues(value)}
        value={selectedValues}
        disabled={isDisabled}
        suffixIcon={selectedIcon}
        filterOption={false}
        notFoundContent="No options found"
        style={{ width: '100%' }}
        className="custom-select"
      >
        {sortedOptions.map(option => (
          <Option key={option.id} value={option.id}>
            {option.title}
          </Option>
        ))}
      </Select>

      <p className="hint-text">Here's a hint to guide you in selecting team members.</p>

      <div style={{ marginTop: '20px' }}>
        <h4>Selected Team Members:</h4>
        {selectedValues.map(value => {
          const selectedPost = options.find(option => option.id === value);
          return selectedPost ? (
            <div className="selectedposts" key={value}>
              {selectedPost.title}
              {selectedIcon && <span>{selectedIcon}</span>}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default CustomSelectWithData;
