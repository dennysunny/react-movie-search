import React, { useState, useEffect } from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';

import { propTypes } from './propTypes';

const FilterGenres = ({ value, genres, onChange }) => {
  const [state, setState] = useState({
    options: [],
    selectValue: [],
  });

  useEffect(() => {
    const options = genres.map(genre => ({ label: genre.name, value: String(genre.id) }));
    setState({ selectValue: value.split(','), options });
  }, []);

  const handleChange = (event) => {
    setState({
      ...state,
      selectValue: event.target.value,
    });
  };

  const handleClose = () => {
    onChange(state.selectValue);
  };

  return (
    <FormControl className="filter-element-wrapper" variant="outlined">
      <InputLabel htmlFor="genres">Genres</InputLabel>
      <Select
        multiple
        value={state.selectValue}
        onChange={handleChange}
        onClose={handleClose}
        input={<OutlinedInput id="genres" />}
      >
        {state.options.map(option => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterGenres;
