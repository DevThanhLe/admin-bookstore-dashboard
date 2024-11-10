import { Breadcrumbs } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { FaHome } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { MdAddCircle } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createVoucher } from '../../services/VoucherService';

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

const VoucherCreate = () => {
  const [createDate, setCreateDate] = useState('');
  const [expiredDate, setExpiredDate] = useState('');
  const [minPurchase, setMinPurchase] = useState(0);
  const [quantity, setQuantity] = useState(1); // Khởi tạo với giá trị 1
  const [discount, setDiscount] = useState(1);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setCreateDate(today);
  }, []);

  const handleExpiredDateChange = (e) => {
    const selectedDate = e.target.value;
    const nextDay = new Date(createDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStr = nextDay.toISOString().split('T')[0];
    if (selectedDate < nextDayStr) {
      toast.error("Expired Date Phải sau Create Date ít nhất 1 ngày!");
    } else {
      setExpiredDate(selectedDate);
    }
  };

  const handleDiscountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < 1 || value > 100) {
      toast.error("Discount percentage phải giữa khoảng 1 và 100!");
    } else {
      setDiscount(value);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < 1) {
      toast.error("Quantity phải ít nhất là 1!");
    } else {
      setQuantity(value);
    }
  };

  const prepareDataForPost = async () => {
    // Kiểm tra xem các trường dữ liệu có hợp lệ không
    if (!expiredDate) {
      toast.error("Hãy chọn Expired Date!");
      return; // Dừng việc gửi dữ liệu nếu Expired Date không được chọn
    }

    const formattedCreateDate = new Date(createDate).toISOString();
    const formattedExpiredDate = new Date(expiredDate).toISOString();

    const voucherData = {
      releaseDate: formattedCreateDate,
      expiredDate: formattedExpiredDate,
      minCost: minPurchase,
      quantity: quantity,
      discount: discount / 100
    };

    try {
      // Gọi service createVoucher để gửi dữ liệu
      const response = await createVoucher(voucherData);
      if (response.status === 200) {
        setMinPurchase(0);
        setQuantity(1);
        setDiscount(1);
        setExpiredDate('');
        toast.success("Tạo Voucher thành công!");
      } else {
        toast.error("Lỗi khi tạo Voucher!");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  return (
    <div>
      <div className='right-content w-100'>
        <div className='card shadow border-0 w-100 flex-row p-4'>
          <h5 className='mb-0'>Voucher Create</h5>
          <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
            <StyledBreadcrumb component='a' href='#' label='Dashboard' icon={<FaHome fontSize='small' />} />
            <StyledBreadcrumb component='a' href='#' label='Vouchers' deleteIcon={<MdDelete />} />
            <StyledBreadcrumb label='Create' />
          </Breadcrumbs>
        </div>

        <div className='card productDetailsSection pe-4 ps-4 pb-4 pt-3'>
          <div className='row'>
            <h5 className='mb-3'>Voucher's Information</h5>
            <div className='col-sm-6 order-detail mb-3'>
              <h6>Minimum purchase amount to apply the voucher</h6>
              <input className='w-100 p-2' type='number' min='0' value={minPurchase} onChange={(e) => setMinPurchase(e.target.value)} />
            </div>
            <div className='col-sm-6 order-detail mb-3'>
              <h6>Quantity</h6>
              <input className='w-100 p-2' type='number' min='1' value={quantity} onChange={handleQuantityChange} />
            </div>
            <div className='col-sm-6 order-detail mb-3'>
              <h6>Discount percentage ( 1 - 100 )</h6>  
              <input className='w-100 p-2' type='number' min='1' max='100' value={discount} onChange={handleDiscountChange} />
            </div>
            <div className='col-sm-6 order-detail mb-3'>
              <h6>Create Date ( month/day/year )</h6>
              <input className='w-100 p-2' type='date' value={createDate} readOnly />
            </div>
            <div className='col-sm-6 order-detail mb-3'>
              <h6>Expired Date ( month/day/year )</h6>
              <input className='w-100 p-2' type='date' value={expiredDate} onChange={handleExpiredDateChange} />
            </div>
            <div className='col-sm-6 d-flex justify-content-end mt-4 mb-3'>
              <Button className="me-2" color="success" variant="contained" onClick={prepareDataForPost}><MdAddCircle /></Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default VoucherCreate;
