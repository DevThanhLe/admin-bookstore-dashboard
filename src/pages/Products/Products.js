  import { Breadcrumbs } from '@mui/material';
  import React from 'react';
  import { FaHome } from "react-icons/fa";
  import { MdDelete } from "react-icons/md";
  import { emphasize, styled } from '@mui/material/styles';
  import Chip from '@mui/material/Chip';
  // import productsData from './ProductData'
  // import Button from '@mui/material/Button'
  import { Link } from 'react-router-dom';
  import Search from '../../components/Search/Search';
  import GenreSelect from './components/GenreSelect';
  import InputLabel from '@mui/material/InputLabel';
  import MenuItem from '@mui/material/MenuItem';
  import FormControl from '@mui/material/FormControl';
  import Select from '@mui/material/Select';
  import OutlinedInput from '@mui/material/OutlinedInput';
  import Pagination from '@mui/material/Pagination';
  // import { useState } from "react";
  // import { useEffect } from "react";
  import { fetchAllProducts } from '../../services/ProductService'

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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };


  // const ProductStructure = ({ id,name, price, originalPrice, reviews, rating, image }) => {
  const ProductStructure = ({ id, name, price, image }) => {

    // const roundedRating = Math.round(rating);

    return(
      <Link className="product" to={`/Products/Details/${id}`}>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        {/* <div className="product-rating">
          {'★'.repeat(roundedRating)}{'☆'.repeat(5 - roundedRating)}
          {rating} ★
          <span>({reviews} reviews)</span>
        </div> */}
        <p className="product-price">
          {/* <span className="original-price">${originalPrice}</span> ${price} */}
          <span className="original-price">{formatCurrency(price)}</span>
        </p>
      </Link>
    );

  }

  const Products = () => {
      const token = localStorage.getItem("token");

      const [order, setOrder] = React.useState('');

      const [productsData, setProductsData] = React.useState([]);
      const [currentPage, setCurrentPage] = React.useState(1); // Trang hiện tại bắt đầu từ 1
      const [totalPages, setTotalPages] = React.useState(1); // Tổng số trang mặc định

      // Hàm gọi API để lấy dữ liệu sản phẩm
      const getProducts = async (page,token) => {
        
        let res = await fetchAllProducts(page,token);
        if (res) {
          // pull về thì sửa gỡ command .items 
          setProductsData(res.data.items);
          setTotalPages(res.data.totalPages);


          // setProductsData(res.data);
          // setTotalPages(5);
          // console.log(res.data);
        }
      };

      // Gọi API fetchProduct
      React.useEffect(() => {
        getProducts(currentPage,token);
      }, [currentPage,token]);

      const handleChangePage = (event, page) => {
        setCurrentPage(page);
      };

      const handleChange = (event) => {
        setOrder(event.target.value);
      };

      return(
        
          <div className='right-content w-100'>

              <div className='card shadow border-0 w-100 flex-row p-4'>
                  <h5 className='mb-0'>Product Lists</h5>
                  <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                      <StyledBreadcrumb component='a' href='#' label='Dashboard' icon={<FaHome fontSize='small'/>}/>
                      <StyledBreadcrumb label='Products' deleteIcon={<MdDelete/>}/>
                  </Breadcrumbs>
              </div>

              <div className='product-box'>
                <div className='product-search d-flex align-items-center'>
                    <div className='searchProductWrapper pe-2'>
                      <Search />
                    </div>
                    <div className='col-md-3 genreWrapper'>
                      <GenreSelect/>
                    </div>
                    <div className='order-select p-0'>
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-multiple-checkbox-label">Order By</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={order}
                          input={<OutlinedInput label="Order By" />}
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#000',
                            },
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={1}>Ascending</MenuItem>
                          <MenuItem value={2}>Descending</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                </div>

                {/* <div className="product-list">
                  {productsData.map(product => (
                    <ProductStructure
                      key={product.id}
                      id={product.id}
                      name={product.title}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      reviews={product.reviews}
                      rating={product.rating}
                      image={product.image}
                    />
                  ))}
                </div> */}
                <div className="product-list">
                  {productsData.map(product => (
                    <ProductStructure
                      key={product.bookId}
                      id={product.bookId}
                      name={product.title}
                      price={product.price}
                      // originalPrice={product.originalPrice}
                      // reviews={product.reviews}
                      // rating={product.rating}
                      image={product.image}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {/* <div className="d-flex tableFooter pe-2 pt-2">
                    <Pagination count={4} className='pagination' showFirstButton showLastButton/>
                </div> */}

                {/* Phân trang */}
                <div className="d-flex tableFooter pe-2">
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handleChangePage}
                      className='pagination'
                      showFirstButton
                      showLastButton
                    />
                </div>

              </div>

          </div>
      )
  }

  export default Products