import { Breadcrumbs } from '@mui/material';
import React from 'react';
import { FaHome } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { FaPencil } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import { Link } from 'react-router-dom';

const orderData = {
  "orderId": 1,
  "orderDate": "2024-11-09T13:27:54.72",
  "totalAmount": 134500,
  "name": "Pham Trường Đức",
  "status": "Processing",
  "phone": "string",
  "address": "string",
  "orderItems": [
    {
      "quantity": 1,
      "booksDto": {
        "bookId": 6,
        "title": "Don't worry ! you're still fine",
        "price": 45000,
        "image": "https://firebasestorage.googleapis.com/v0/b/bookstore-59884.appspot.com/o/images%2F5b6f821b-e582-4a5a-a548-5db4617f56f2.webp?alt=media&token=49d40d95-58cf-4d63-95c7-65b21a7e95a9",
        "authorName": "Jason Adam Katzenstein",
        "isSale": 1,
        "rating": 2.5,
        "brandNames": [
          "Psychology",
          "Philosophy"
        ]
      }
    },
    {
      "quantity": 1,
      "booksDto": {
        "bookId": 5,
        "title": "Crime scene cleaner",
        "price": 89500,
        "image": "https://firebasestorage.googleapis.com/v0/b/bookstore-59884.appspot.com/o/images%2F09b731ac-1998-4e2f-b24c-740c4ed39b8c.webp?alt=media&token=245fe202-b84f-4903-8e61-085da6a7357c",
        "authorName": "LapLap",
        "isSale": 1,
        "rating": 4.5,
        "brandNames": [
          "Horror",
          "Science"
        ]
      }
    }
    
  ]
}

const formatDate = (dateString) => {
  // const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const options = { day: 'numeric', month: 'numeric',year: 'numeric' };
  // return new Date(dateString).toLocaleDateString(undefined, options);
  return new Date(dateString).toLocaleDateString('vi-VN', options);
};

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

const OrderItemsStructure = ({ id, name, price, image, quantity, rating }) => {
  return (
    // <Link className="row mt-2" to={`/Products/Details/${id}`}>
    //   <div className='col-sm-5'>
    //     <img src={image} alt='Product' className='product-image' />
    //   </div>
    //   <div className='col-sm-7 order-detail mb-3 mt-2'>
    //     <h5>{name}</h5>
    //     <h6>Quantity</h6>
    //     <input className='w-100 p-2 mb-2' type='number' min='1' value={quantity} readOnly/>
    //     <h6>Price</h6>
    //     <input className='w-100 p-2' type='text' value={price} readOnly/>
    //   </div>
    // </Link>
    <Link className="product-order" to={`/Products/Details/${id}`}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <div className="product-rating">
        {/* {'★'.repeat(roundedRating)}{'☆'.repeat(5 - roundedRating)} */}
        {rating} ★
        {/* <span>({reviews} reviews)</span> */}
        <span>({quantity} items)</span>
      </div>
      
      <p className="product-price">
        {/* <span className="original-price">${originalPrice}</span> ${price} */}
        <span className="original-price">{price.toLocaleString('vi-VN')} đ</span>
      </p>
    </Link>
  );
}

const OrderDetails = () => {
  return (
    <div>
      <div className='right-content w-100'>
        <div className='card shadow border-0 w-100 flex-row p-4'>
          <h5 className='mb-0'>Order's Details</h5>
          <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
            <StyledBreadcrumb component='a' href='#' label='Dashboard' icon={<FaHome fontSize='small' />} />
            <StyledBreadcrumb component='a' href='#' label='Orders' deleteIcon={<MdDelete />} />
            <StyledBreadcrumb label='Details' />
          </Breadcrumbs>
        </div>

        <div className='card productDetailsSection pe-4 ps-4 pb-4 pt-3'>
          <div className='row'>
            <h5 className='mb-3'>Order's Information</h5>
            <div className='col-sm-6 order-detail mb-3'>
              <h6>User's full name</h6>
              <input className='w-100 p-2' type='text' value={orderData.name} readOnly/>
            </div>
            <div className='col-sm-6 order-detail mb-3'>
              <h6>Phone</h6>
              <input className='w-100 p-2' type='text' value={orderData.phone} readOnly/>
            </div>
            <div className='col-sm-6 order-detail mb-3'>
              <h6>Address</h6>
              <input className='w-100 p-2' type='text' value={orderData.address} readOnly/>
            </div>
            <div className='col-sm-6 order-detail mb-3'>
              <h6>Order's Date</h6>
              <input className='w-100 p-2' type='text' value={formatDate(orderData.orderDate)} readOnly/>
            </div>
            <div className='col-sm-6 order-detail mb-3'>
              <h6>Status</h6>
              <input className='w-100 p-2' type='text' value={orderData.status} readOnly/>
            </div>
            <div className='col-sm-6 order-detail mb-3'>
              <h6>Total</h6>
              <input className='w-100 p-2' type='text' value={orderData.totalAmount.toLocaleString('vi-VN') + ' đ'} readOnly/>
            </div>
          </div>
          <div className='buttonWrapper d-flex justify-content-end pt-3'>
            <Button className="me-2" color="success" variant="contained"><FaPencil /></Button>
            <Button color="error" variant="contained"><IoTrashBin /></Button>
          </div>
        </div>

        <div className='card productDetailsSection p-4'>
          <h5 className='mb-0'>Order's Items</h5>
          <div className="product-list-order">
            {orderData.orderItems.map((item, index) => (
              <OrderItemsStructure
                key={index}
                id={item.booksDto.bookId}
                name={item.booksDto.title}
                price={item.booksDto.price}
                image={item.booksDto.image}
                quantity={item.quantity}
                rating={item.booksDto.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
