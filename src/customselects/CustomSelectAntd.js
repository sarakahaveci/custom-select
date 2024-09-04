import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const CustomSelectAntd = ({
  options = [], 
  onSelect = () => {},
  filter = '', 
  sort = false,
  icon = null, 
  disabled = false, 
  displayField = 'name', 
}) => {
  const safeOptions = Array.isArray(options) ? options : [];

  const sortedOptions = sort
    ? [...safeOptions].sort((a, b) => a[displayField].localeCompare(b[displayField]))
    : safeOptions;

  const filteredOptions = filter
    ? sortedOptions.filter(option => option[displayField]?.toLowerCase().includes(filter.toLowerCase()))
    : sortedOptions;

  return (
    <div className="custom-select-wrapper">
      <label className="select-label">Team Member</label>
      <Select
        onChange={onSelect}
        disabled={disabled}
        suffixIcon={icon}
        placeholder="Select a team member"
        style={{ width: '100%' }} 
        showSearch 
        className="custom-select" 
      >
        {filteredOptions.map(option => (
          <Option key={option.id} value={option.id}>
            {option[displayField]}
          </Option>
        ))}
      </Select>
      <p className="hint-text">Select a team member from the list.</p>
    </div>
  );
};

export default CustomSelectAntd;
