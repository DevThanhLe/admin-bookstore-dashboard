import React, { useState } from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { FaHome } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Breadcrumbs, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import GenreSelect from './components/GenreSelect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createProduct } from '../../services/ProductService';

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
  // const token = localStorage.getItem("token");
//   tạo form 
  const initialFormData = {
    title: '',
    brandId: [],
    price: 0,
    quantity: 0,
    Description: '',
    typeBookId: 0,
    authorName: ''
  };

  const [formData, setFormData] = useState(initialFormData);

//   const [submittedData, setSubmittedData] = useState(null); // State để lưu trữ dữ liệu đã submit

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [bookFile, setBookFile] = useState(null);


  const [stock, setStock] = useState(0);
  const [resetGenres, setResetGenres] = useState(false); // State để reset genre

  // Điều kiện form
  const validateForm = () => {
    // Kiểm tra các trường bắt buộc
    if (!formData.title || !formData.authorName || !formData.Description) {
      toast.error("All fields are required");
      return false;
    }

    if (!formData.price || formData.price <= 0) {
      toast.error("Price must be greater than 0");
      return false;
    }

    if (formData.typeBookId === 0) {
      toast.error("Please select a type of book");
      return false;
    }

    if (formData.brandId.length === 0) {
      toast.error("Please select at least one genre");
      return false;
    }

    if (!imageFile) {
      toast.error("Please upload an image");
      return false;
    }

    if (formData.typeBookId !== 1 && !bookFile) {
      toast.error("Ebook file is required for Ebook type");
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      console.error('No valid file was selected.');
    }
  };

  const handleFileBookChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBookFile(file);
      // setImagePreview(URL.createObjectURL(file));
    } else {
      console.error('No valid file was selected.');
    }

    // if(bookFile === null){
    //   e.target.value = null;
    // }
  };

  // Callback function để nhận updatedGenreId từ GenreSelect
  const handleGenreIdChange = (updatedGenreId) => {
    setFormData((prevFormData) => ({
    ...prevFormData,
    brandId: updatedGenreId
    }));
  };

  const handleSubmit = async (e) => {

    if (!validateForm()) {
        return; // Không submit nếu form không hợp lệ
    }
    // Cập nhật quantity bằng giá trị stock trước khi gửi dữ liệu
    const updatedFormData = {
      ...formData,
      quantity: stock,
    };

    // Cập nhật formData state
    setFormData(updatedFormData);

    // Tạo FormData
    const data = new FormData();
    // if (imageFile) {
    data.append('ImageFile', imageFile);  
    // } else {
    //   toast.error("Please upload an image");
    //   return;
    // }
  
    // Append book file if it exists
    // if (bookFile) {
      data.append('EbookFile', bookFile);
    // } else {
    //   toast.error("Please upload a book file");
    //   return;
    // }
    data.append('Title', formData.title);
    formData.brandId.forEach((id, index) => {
      data.append(`BrandId[${index}]`, id);
    });
    data.append('Price', formData.price);
    data.append('Quantity', stock);
    data.append('Description', formData.Description);
    data.append('TypeBookId', formData.typeBookId);
    data.append('AuthorName', formData.authorName);

    // Thực hiện hành động upload ở đây, ví dụ như gửi request đến server
    // console.log("Data to be submitted:");
    // for (let pair of data.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }

    //Gọi API post book
    let res = await createProduct(data);
    setResetGenres(true);
    if (res) {
      toast.success("Adding product is succeed!");
      // Reset form fields
      setFormData(initialFormData);
      setImageFile(null);
      setBookFile(null);
      setImagePreview(null);
      setStock(0);
      setTimeout(() => setResetGenres(false), 0);
    } 
    else 
    {
      toast.error("Error!");
    }
    // Nếu bạn muốn hiển thị dữ liệu đã submit trên giao diện người dùng
    // setSubmittedData(updatedFormData);
  };

  const handleChangeStock = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setStock(value);
    } else {
      setStock(0);
    }
  };

  const handleChangeTypeOfBook = (event) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      typeBookId: value
    }));
  };

  return (
    <div>
      <div className='right-content w-100'>
        <div className='card shadow border-0 w-100 flex-row p-4 mb-0'>
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
                <h5 className='mb-0'>Upload Image</h5>
                <input
                  accept='image/*'
                  type='file'
                  onChange={handleFileChange}
                  style={{ marginTop: '20px' }}
                />
                {imagePreview && (
                  <img src={imagePreview} alt='Preview' style={{ marginTop: '20px', maxWidth: '100%', height: '450px' }} />
                )}
              </div>

              <div className='card p-4'>
                <h5 className='mb-0'>Upload Book</h5>
                <input
                  accept='.pdf, .doc, .docx, .txt'
                  type='file'
                  onChange={handleFileBookChange}
                  style={{ marginTop: '20px' }}
                  disabled={formData.typeBookId !== 2}
                />
              </div>

            </div>
            {/* get data and post  */}
            <div className='col-sm-7'>
              <div className='card ps-4 pe-4 pt-4'>
                <h5 className='mb-4'>Basic Infomation</h5>
                
                {/* Book name  */}
                <div className='form-group'>
                  <h6>Title</h6>
                  <input type='text' name='title' value={formData.title} onChange={handleInputChange} />
                </div>

                {/* Author name  */}
                <div className='form-group'>
                  <h6>Author</h6>
                  <input type='text' name='authorName' value={formData.authorName} onChange={handleInputChange} />
                </div>

                {/* Price  */}
                <div className='form-group'>
                  <h6>Price</h6>
                  <input type='number' name='price' value={formData.price} onChange={handleInputChange} />
                </div>

                {/* Quantity  */}
                <div className='form-group'>
                  <h6>Quantity</h6>
                  <input
                    type='number'
                    value={stock}
                    onChange={handleChangeStock}
                    min='0'
                    onKeyDown={(e) => {
                      if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                
                {/* Link ebook  */}
                {/* <div className='form-group'>
                  <h6>Link Ebook</h6>
                  <input type='text' />
                </div> */}
                
                {/* Description  */}
                <div className='form-group'>
                  <h6>Description</h6>
                  <textarea
                    name='Description'
                    value={formData.Description}
                    onChange={handleInputChange}
                    rows={5}
                    cols={10}
                  />
                </div>
                
                {/* Type book  */}
                <div className='row'>
                  <div className='col pb-2'>
                    <h6>Type Of Book</h6>
                    <Select
                      value={formData.typeBookId}
                      onChange={handleChangeTypeOfBook}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      className='w-100'
                    >
                      <MenuItem value={0}>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>Nbook</MenuItem>
                      <MenuItem value={2}>Ebook</MenuItem>
                      {/* <MenuItem value={3}>Nbook and Ebook</MenuItem> */}
                    </Select>
                  </div>

                  <div className='col pb-2'>
                    <h6>Genre</h6>
                    <GenreSelect className='genre-upload' onGenreIdChange={handleGenreIdChange} resetGenres={resetGenres}/>
                  </div>

                </div>

                <div className='card mt-4'>
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Upload Product
                  </Button>
                </div>
                
                {/* Check form  */}
                {/* {submittedData && (
                  <div className='card mt-4'>
                    <h5>Submitted Data:</h5>
                    <pre>{JSON.stringify(submittedData, null, 2)}</pre>
                  </div>
                )} */}

              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductUpload;
