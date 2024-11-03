import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { fetchAllBrands } from '../../../services/BrandService';

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

export default function GenreSelect({ onGenreIdChange, resetGenres }) {
  const [genreName, setGenreName] = React.useState([]);
  const [fullBrands,setFullBrands] = React.useState([]);
  const [brands, setBrands] = React.useState([]); // State to hold the brand names

  // Fetch brands when the component mounts
  React.useEffect(() => {
    const getBrands = async () => {
      try {
        const response = await fetchAllBrands();
        // Assuming response.data is an array of brand objects with a name property
        setFullBrands(response.data);
        const brandNames = response.data.map(brand => brand.name);
        setBrands(brandNames);
      } catch (error) {
        console.error("Failed to fetch brands", error);
      }
    };

    getBrands();
  }, []);

    // Hàm để reset genreName
    React.useEffect(() => {
      if (resetGenres) {
        setGenreName([]);
        onGenreIdChange([]); // Gọi lại hàm để thông báo về danh sách genreId đã cập nhật
      }
    }, [resetGenres, onGenreIdChange]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedValues = typeof value === 'string' ? value.split(',') : value;
  
    // Nếu không có mục nào được chọn, hiển thị "None"
    const updatedGenreName = selectedValues.length === 0 ? [] : selectedValues;
    setGenreName(updatedGenreName);
  
    // Lấy updatedGenreId từ fullBrands
    const updatedGenreId = updatedGenreName.map(name => {
      const brand = fullBrands.find(b => b.name === name);
      return brand ? brand.brandId : null; // Nếu không tìm thấy, trả về null
    }).filter(id => id !== null); // Lọc bỏ giá trị null
  
    // In ra console giá trị đã chọn và updatedGenreId
    // console.log("Selected Genres:", updatedGenreName);
    // console.log("Updated Genre Ids:", updatedGenreId); // Input cho các lệnh API

    onGenreIdChange(updatedGenreId)
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
