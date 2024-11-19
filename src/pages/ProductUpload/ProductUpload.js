import React, { useState, useRef  } from 'react';
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
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [typeBookId, setTypeBookId] = useState(0);
  const [brandId, setBrandId] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [bookFile, setBookFile] = useState(null);
  const [resetGenres, setResetGenres] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const imageInputRef = useRef(null);

  const validateForm = () => {
    if (!title || !authorName || !description) {
      toast.error("Đừng bỏ trống các thông tin!");
      return false;
    }
    if (!price || price <= 0) {
      toast.error("Giá tiền phải lớn hơn 0!");
      return false;
    }
    if (typeBookId === 0) {
      toast.error("Vui lòng chọn Type book");
      return false;
    }
    if (brandId.length === 0) {
      toast.error("Hãy chọn ít nhất 1 thể loại!");
      return false;
    }
    if (!imageFile) {
      toast.error("Hãy đăng file ảnh lên!");
      return false;
    }
    if (typeBookId !== 1 && !bookFile) {
      toast.error("Cần phải tải Ebook file lên khi Type book là Ebook!");
      return false;
    }
    if (typeBookId !== 2 && quantity === 0) {
      toast.error("số lượng của sách Nbook mới tạo phải lớn hơn 0!");
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileBookChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBookFile(file);
    }
  };

  const handleGenreIdChange = (updatedGenreId) => {
    setBrandId(updatedGenreId);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    if(typeBookId === 2){
      setQuantity(20);
    }

    const data = new FormData();
    data.append('ImageFile', imageFile);
    if (bookFile) data.append('EbookFile', bookFile);
    data.append('Title', title);
    brandId.forEach((id, index) => {
      data.append(`BrandId[${index}]`, id);
    });
    data.append('Price', price);
    data.append('Quantity', quantity);
    data.append('Description', description);
    data.append('TypeBookId', typeBookId);
    data.append('AuthorName', authorName);

    try {
      let res = await createProduct(data);
      setResetGenres(true);
      if (res) {
        toast.success("Product added successfully!");
        resetForm();
      } else {
        toast.error("Error adding product!");
      }
    } catch (error) {
      toast.error("Error adding product!");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (typeBookId === 2) {
      setQuantity(20);
    }
  }, [typeBookId]);

  const resetForm = () => {
    setTitle('');
    setAuthorName('');
    setPrice(0);
    setQuantity(0);
    setDescription('');
    setTypeBookId(0);
    setBrandId([]);
    setImageFile(null);
    setImagePreview(null);
    setBookFile(null);
    setResetGenres(false);

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
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
            <div className='col-sm-5'>
              <div className='card p-4'>
                <h5 className='mb-0'>Upload Image</h5>
                <input
                  accept='image/*'
                  type='file'
                  onChange={handleFileChange}
                  style={{ marginTop: '20px' }}
                  disabled={isLoading}
                  ref={imageInputRef}
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
                  disabled={typeBookId !== 2 || isLoading}
                />
              </div>
            </div>
            <div className='col-sm-7'>
              <div className='card ps-4 pe-4 pt-4'>
                <h5 className='mb-4'>Basic Information</h5>
                <div className='form-group'>
                  <h6>Title</h6>
                  <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} disabled={isLoading}/>
                </div>

                <div className='form-group'>
                  <h6>Author</h6>
                  <input type='text' value={authorName} onChange={(e) => setAuthorName(e.target.value)} disabled={isLoading}/>
                </div>

                <div className='form-group'>
                  <h6>Price</h6>
                  <input type='number' value={price} onChange={(e) => setPrice(Number(e.target.value))} disabled={isLoading}/>
                </div>

                {typeBookId !== 2 && (
                  <div className='form-group'>
                    <h6>Quantity</h6>
                    <input
                      type='number'
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      min='0'
                      onKeyDown={(e) => {
                        if (['-', 'e', 'E'].includes(e.key)) e.preventDefault();
                      }}
                      disabled={isLoading}
                    />
                  </div>
                )}

                <div className='form-group'>
                  <h6>Description</h6>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    cols={10}
                    disabled={isLoading}
                  />
                </div>

                <div className='row'>
                  <div className='col pb-2'>
                    <h6>Type Of Book</h6>
                    <Select
                      value={typeBookId}
                      onChange={(e) => setTypeBookId(e.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      className='w-100'
                      disabled={isLoading}
                    >
                      <MenuItem value={0}><em>None</em></MenuItem>
                      <MenuItem value={1}>Nbook</MenuItem>
                      <MenuItem value={2}>Ebook</MenuItem>
                    </Select>
                  </div>

                  <div className='col pb-2'>
                    <h6>Genre</h6>
                    <GenreSelect className='genre-upload' onGenreIdChange={handleGenreIdChange} resetGenres={resetGenres}/>
                  </div>
                </div>

                <div className='card mt-4'>
                  <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? 'Uploading...' : 'Upload Product'}
                  </Button>
                </div>
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
