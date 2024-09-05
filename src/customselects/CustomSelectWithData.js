import React, { useState } from 'react';
import { Select, Input } from 'antd';
import { useQuery } from '@tanstack/react-query';
import './CustomSelectWithData.css';

const { Option } = Select;

// Fetch posts function
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const CustomSelectWithData = () => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  const { data: options = [], isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <p>Loading options...</p>;
  }

  if (isError) {
    return <p>Failed to fetch options</p>;
  }

  const filteredOptions = filter
    ? options.filter(option => option.title.toLowerCase().includes(filter.toLowerCase()))
    : options;

  const sortedOptions = sort
    ? [...filteredOptions].sort((a, b) => a.title.localeCompare(b.title))
    : filteredOptions;

  return (
    <div className="custom-select-wrapper">
      <label className="select-label">Team member</label>
      
      <Input
        className="filter-input"
        placeholder="Search here"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <Select
        mode="multiple"
        placeholder="Select team member"
        onChange={(value) => setSelectedValues(value)}
        value={selectedValues}
        disabled={isDisabled}
        suffixIcon={selectedIcon}
        filterOption={false}
        notFoundContent="No options available"
        style={{ width: '100%' }}
        className="custom-select"
      >
        {sortedOptions.map(option => (
          <Option key={option.id} value={option.id}>
            {option.title}
          </Option>
        ))}
      </Select>

      <p className="hint-text">This is a hint text to help the user.</p>

      <div style={{ marginTop: '20px' }}>
        <h4>Selected Team Members:</h4>
        {selectedValues.map(value => {
          const selectedPost = options.find(option => option.id === value);
          return selectedPost ? (
            <div className="selectedposts" key={value}>{selectedPost.title}</div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default CustomSelectWithData;
