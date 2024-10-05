import { Breadcrumbs } from '@mui/material';
import React from 'react';
import { FaHome } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import productsData from './ProductData'
// import Button from '@mui/material/Button'
import { Link } from 'react-router-dom';
import Search from '../../components/Search/Search';

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


const ProductStructure = ({ id,name, price, originalPrice, reviews, rating, image }) => {

  // const roundedRating = Math.round(rating);

  return(
    <Link className="product" to={`/Products/Details/${id}`}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <div className="product-rating">
        {/* {'★'.repeat(roundedRating)}{'☆'.repeat(5 - roundedRating)} */}
        {rating} ★
        <span>({reviews} reviews)</span>
      </div>
      <p className="product-price">
        {/* <span className="original-price">${originalPrice}</span> ${price} */}
        <span className="original-price">{formatCurrency(originalPrice)}</span>
      </p>
    </Link>
  );

}

const Products = () => {
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
              <div className='product-search pb-3'>
                  <Search/>
              </div>

              <div className="product-list">
                {productsData.map(product => (
                  <ProductStructure
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    reviews={product.reviews}
                    rating={product.rating}
                    image={product.image}
                  />
                ))}
              </div>
            </div>

        </div>
    )
}

export default Products