import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface CustomSelectProps {
  label: string;
  value: any;
  onChange: (event: SelectChangeEvent<string | number>) => void; // Using SelectChangeEvent for better type safety
  options: Array<{ label: string; value: string | number }>; // Keeping value as any for flexibility
}
export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  const selectId = `select-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const customSelectStyles = {
    // Common styles
    '.MuiFormControl-root': {
      margin: 1, // Use the theme's spacing scale
      minWidth: 120,
      background: 'black',
    },
    '.MuiInputLabel-root': {
      color: 'rgba(94, 0, 140, 1)',
    },
    '.MuiSelect-select': {
      '&:focus': {
        backgroundColor: 'rgba(94, 0, 140, 0.1)', // A light purple tinge on focus
      },
    },
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(94, 0, 140, 1)', // P
    },
    // Responsive styles using the theme breakpoints
    '@media (min-width: 600px)': {
      // 600px is the default Material-UI 'sm' breakpoint
      '.MuiFormControl-root': {
        minWidth: 240,
      },
    },
  };
  return (
    <FormControl fullWidth sx={customSelectStyles}>
      <InputLabel id={`${selectId}-label`}>{label}</InputLabel>
      <Select
        labelId={`${selectId}-label`}
        id={selectId}
        value={value}
        label={label} // This ensures the space for the label is always reserved.
        onChange={onChange}
        displayEmpty
        sx={{
          '&:before': { borderColor: 'purple' },
          '&:after': { borderColor: 'purple' },
          '&:hover:not(.Mui-disabled):before': { borderColor: 'purple' },
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(94, 0, 140, 0.7)',
                color: 'white',
                '&:hover': {    backgroundColor: 'rgba(94, 0, 140, 0.7)', color: 'white' },
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
