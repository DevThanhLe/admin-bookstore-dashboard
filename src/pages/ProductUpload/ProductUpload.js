import React, { useState } from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { FaHome } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Breadcrumbs, Button } from '@mui/material';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import GenreSelect from './components/GenreSelect';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const ProductUpload = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     brandId: '',
//     price: 0,
//     quantity: 0,
//     description: '',
//     typeBookId: 0,
//     author_name: ''
//   });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    const data = new FormData();
    data.append('imageFile', imageFile);
    // data.append('BookJson', JSON.stringify(formData));

    // Thực hiện hành động upload ở đây, ví dụ như gửi request đến server
    console.log("Data to be submitted:", data);
  };

  const [typeOfBookVal, setTypeOfBookVal] = React.useState('');

  const handleChangeTypeOfBook = (event) => {
    setTypeOfBookVal(event.target.value);
  };

    const [stock, setStock] = useState(0);

    const handleChangeStock = (e) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            setStock(value);
        } else {
            setStock(0);
        }
    };

  return (
    <div>
      <div className='right-content w-100'>

            <div className='card shadow border-0 w-100 flex-row p-4'>
                <h5 className='mb-0'>Product Upload</h5>
                <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                    <StyledBreadcrumb component='a' href='#' label='Dashboard' icon={<FaHome fontSize='small' />} />
                    <StyledBreadcrumb component='a' href='#' label='Product' deleteIcon={<MdDelete />} />
                    <StyledBreadcrumb label='Upload' />
                </Breadcrumbs>
            </div>

            <div className='form'>

                <div className='row'>
                    {/* display img uploaded */}
                    <div className='col-sm-5'>
                        <div className='card p-4'>
                            <h5 className='mb-2'>Upload Image</h5>
                            <input
                                accept='image/*'
                                type='file'
                                onChange={handleFileChange}
                                style={{ marginTop: '10px' }}
                            />
                            {imagePreview && (
                                <img src={imagePreview} alt='Preview' style={{ marginTop: '10px', maxWidth: '100%', height: '500px' }} />
                            )}
                        </div>
                    </div>
                    {/* get data and post  */}
                    <div className='col-sm-7'>

                        <div className='card p-4'>
                            <h5 className='mb-4'>Basic Infomation</h5>

                            <div className='form-group'>
                                <h6>Title</h6>
                                <input type='text'/>
                            </div>

                            <div className='form-group'>
                                <h6>Author</h6>
                                <input type='text'/>
                            </div>

                            <div className='form-group'>
                                <h6>Price</h6>
                                <input type='text'/>
                            </div>

                            <div className='form-group'>
                                <h6>Quantity</h6>
                                <input type='number' value={stock} onChange={handleChangeStock} min='0' 
                                    onKeyDown={(e) => {
                                        if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>

                            <div className='form-group'>
                                <h6>Description</h6>
                                <textarea rows={5} cols={10}/>
                            </div> 

                            
                            <div className='row'>
                                <div className='col pb-2'>
                                    <h6>Type Of Book</h6>
                                    <Select
                                        value={typeOfBookVal}
                                        onChange={handleChangeTypeOfBook}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        className='w-100'
                                        >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={1}>Nbook</MenuItem>
                                        <MenuItem value={2}>Ebook</MenuItem>
                                        <MenuItem value={3}>Nbook and Ebook</MenuItem>
                                    </Select>
                                </div>

                                <div className='col pb-2'>
                                    <h6>Genre</h6>
                                    <GenreSelect/>
                                </div>
                                
                            </div>        
                            
                            <div className='card p-2 mt-4'>
                                <Button variant="contained" color="primary" onClick={handleSubmit}>
                                    Upload Product
                                </Button>
                            </div> 

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
  );
};

export default ProductUpload;
