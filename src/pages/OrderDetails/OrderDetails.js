import { Breadcrumbs } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { FaHome } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { FaPencil } from "react-icons/fa6";
// import { IoTrashBin } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import { getOrderDetailsById, updateStatus } from '../../services/OrderService';
import EditDialog from './component/EditDialog';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { MdOutlineChangeCircle } from "react-icons/md";

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
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
  const finalPrice = price * quantity;
  return (
    <Link className="product-order" to={`/Products/Details/${id}`}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <div className="product-rating">
        {(rating ?? 5)} ★
        <span>({quantity} items)</span>
      </div>
      <p className="product-price">
        <span className="original-price">{finalPrice.toLocaleString('vi-VN')} đ</span>
      </p>
    </Link>
  );
};

const OrderDetails = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState({ orderItems: [] }); 

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const [typeCheck, setTypeCheck] = useState(0);


  const [newStatus, setNewStatus] = useState("");


  const getOrderDetails = useCallback(async () => {
    try {
      const res = await getOrderDetailsById(id);
      if (res && res.data) {
        setOrderData(res.data);
        // console.log(res.data);
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  }, [id]);

  useEffect(() => {
    getOrderDetails();
  }, [getOrderDetails]);

  const handleClickOpen = (order) => {
      setCurrent(order);
      setTypeCheck(1);
      setOpen(true);
  };

  const handleClickOpen1 = (order) => {
    setCurrent(order);
    setTypeCheck(2);
    setOpen(true);
};

  const handleClose = () => {
      setOpen(false);
  };

  const handleSave = async () => {
    try {
        if (current && typeCheck === 1) {
            let res = await updateStatus(current.orderId, newStatus);
            if (res) {
                setOpen(false);
                toast.success("Thay đổi Status của Order thành công!");
            }
        }

        if (current && typeCheck === 2) {
          // let res = await updateStatus(current.orderId, newStatus);
          // if (res) {
          //     setOpen(false);
          //     toast.success("Thay đổi Status của Order thành công!");
          // }
          console.log("Updated Name:", current.name); 
          console.log("Updated Phone:", current.phone); 
          console.log("Updated Address:", current.address);

          setOpen(false);
          toast.success("Cập nhật thông tin của Order thành công!");
        }     
    } catch (error) {
        toast.error("Lỗi khi thay đổi thông tin của Order!");
    } finally {
      getOrderDetails();
    }
  };

  const handleStatusChange = (status) => {
    setNewStatus(status);
  };

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
              <input className='w-100 p-2' type='text' value={orderData.name || ''} readOnly />
            </div>
            <div className='col-sm-6 order-detail mb-3'>
              <h6>Phone</h6>
              <input className='w-100 p-2' type='text' value={orderData.phone || ''} readOnly />
            </div>
            <div className='col-sm-6 order-detail mb-3'>
              <h6>Address</h6>
              <input className='w-100 p-2' type='text' value={orderData.address || ''} readOnly />
            </div>
            <div className='col-sm-6 order-detail mb-3'>
              <h6>Order's Date</h6>
              <input className='w-100 p-2' type='text' value={orderData.orderDate ? formatDate(orderData.orderDate) : ''} readOnly />
            </div>
            <div className='col-sm-6 order-detail mb-3'>
              <h6>Status</h6>
              <input className='w-100 p-2' type='text' value={orderData.status || ''} readOnly />
            </div>
            <div className='col-sm-6 order-detail mb-3'>
              <h6>Total</h6>
              <input className='w-100 p-2' type='text' value={orderData.totalAmount ? orderData.totalAmount.toLocaleString('vi-VN') + ' VNĐ' : ''} readOnly />
            </div>
          </div>
          <div className='buttonWrapper d-flex justify-content-end pt-3'>
            <Button
              className="me-2"
              sx={{
                backgroundColor: '#2196f3', // Màu xanh dương nhạt
                color: '#fff', // Màu chữ trắng
                '&:hover': {
                  backgroundColor: '#1976d2', // Màu xanh dương đậm khi hover
                },
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Hiệu ứng nổi
                textTransform: 'none', // Giữ nguyên kiểu chữ
                // borderRadius: '8px', // Bo tròn góc nút
              }}
              variant="contained"
              title="Edit Order's informations"
              onClick={() => handleClickOpen1(orderData)}
            >
              <FaPencil />
            </Button>
            <Button className="me-2" color="success" variant="contained" title="Update Order's status" onClick={() => handleClickOpen(orderData)}><MdOutlineChangeCircle /></Button>
            {/* <Button color="error" variant="contained"><IoTrashBin /></Button> */}
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
      {/* edit dialog  */}
      <EditDialog
          open={open}
          handleClose={handleClose}
          current={current}
          setCurrent={setCurrent}
          handleSave={handleSave}
          onStatusChange={handleStatusChange}
          dialogType={typeCheck}
      />
      <ToastContainer />
    </div>
  );
}

export default OrderDetails;
