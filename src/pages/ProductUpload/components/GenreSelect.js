import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const GenreNames = [
  'Action',
  'Romance',
  'Detective',
  'Comic',
  'Fantasy',
  'Horror',
  'Fiction',
  'Fairy tale',
  'Adventure',
];

export default function GenreSelect() {
  const [genreName, setGenreName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedValues = typeof value === 'string' ? value.split(',') : value;

    setGenreName(selectedValues.length === 0 ? [] : selectedValues);
  };

  return (
    <div>
      <FormControl className='w-100'>
        <Select
          displayEmpty
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={genreName}
          onChange={handleChange}
          renderValue={(selected) =>
            selected.length === 0 ? <em>None</em> : selected.join(', ')
          }
          MenuProps={MenuProps}
          sx={{
            width: '100%',
            maxWidth: 286,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {GenreNames.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={genreName.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
