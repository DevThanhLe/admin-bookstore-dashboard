import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { fetchAllBrands } from '../../../services/BrandService';
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputLabel } from '@mui/material';

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

export default function GenreSelect({ selectedBrandNames, onGenreIdChange }) {
  const [genreName, setGenreName] = React.useState([]);
  const [fullBrands, setFullBrands] = React.useState([]);
  const [brands, setBrands] = React.useState([]); // State to hold the brand names
  const [isFirstLoad, setIsFirstLoad] = React.useState(true); // State to track first load

  React.useEffect(() => {
    const getBrands = async () => {
      try {
        const response = await fetchAllBrands();
        setFullBrands(response.data);
        const brandNames = response.data.map(brand => brand.name);
        setBrands(brandNames);

        // Chỉ ánh xạ selectedBrandNames sang genreName và gọi onGenreIdChange trong lần đầu
        if (isFirstLoad && selectedBrandNames) {
          setGenreName(selectedBrandNames);

          const initialGenreIds = selectedBrandNames.map(name => {
            const brand = response.data.find(b => b.name === name);
            return brand ? brand.brandId : null;
          }).filter(id => id !== null);

          onGenreIdChange(initialGenreIds);
          setIsFirstLoad(false); // Đánh dấu là đã qua lần khởi tạo đầu tiên
        }
      } catch (error) {
        console.error("Failed to fetch brands", error);
      }
    };

    getBrands();
  }, [selectedBrandNames, isFirstLoad, onGenreIdChange]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedValues = typeof value === 'string' ? value.split(',') : value;
    const updatedGenreName = selectedValues.length === 0 ? [] : selectedValues;
    setGenreName(updatedGenreName);

    const updatedGenreId = updatedGenreName.map(name => {
      const brand = fullBrands.find(b => b.name === name);
      return brand ? brand.brandId : null;
    }).filter(id => id !== null);

    onGenreIdChange(updatedGenreId);
  };

  return (
    <div>
      <FormControl className='w-100 mt-2 mb-2'>
        <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={genreName}
          onChange={handleChange}
          input={<OutlinedInput label="Categories" />}
          renderValue={(selected) =>
            selected.length === 0 ? <em>None</em> : selected.join(', ')
          }
          MenuProps={MenuProps}
          sx={{
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {brands.length === 0 ? (
            <MenuItem disabled>
              <ListItemText primary="Loading..." />
            </MenuItem>
          ) : (
            brands.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={genreName.includes(name)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
}
