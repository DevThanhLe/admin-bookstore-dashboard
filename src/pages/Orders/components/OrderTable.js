import React, { useState } from 'react';
import { Button } from '@mui/material';
import { FaPencil } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import Pagination from '@mui/material/Pagination';
import EditDialog from './EditDialog';
import { Link } from 'react-router-dom';
import { fetchAllOrders, updateStatus, searchOrders } from '../../../services/OrderService';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Search from '../../../components/Search/Search';
import {TextField} from '@mui/material';
// import Search from '../../components/Search/Search';
// import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MdOutlineClear } from "react-icons/md";

const OrderTable = () => {

    const currentYear = new Date().getFullYear();
    // const maxDate = `${currentYear}-12`; // Giới hạn là tháng 12 của năm hiện tại

    const [searchPhone, setSearchPhone] = React.useState('');
    const [orderYear, setOrderYear] = React.useState('');
    const [orderMonth, setOrderMonth] = React.useState('');
    const [orderStatus, setOrderStatus] = useState(0);

    const handleSearchPhone = (searchTerm) => {
      setSearchPhone(searchTerm)
    };

    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    

    const [ordersData, setOrderData] = useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

    const StatusType = (statusNum) => {
        switch (statusNum) {
            case 1:
                return "Processing";
            case 2:
                return "Departed from Warehouse";
            case 3:
                return "Shipping";
            case 4:
                return "Completed";
            case 5:
                return "Canceled";
            default:
                return "";
        }
    };

    const handleClickOpen = (order) => {
        setCurrent(order);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getOrders = async (page) => {
        let res = await fetchAllOrders(page);
        if (res) {
            setOrderData(res.data.items);
            setTotalPages(res.data.totalPages);
        }
    };

    React.useEffect(() => {
        getOrders(currentPage);
        // console.log(StatusType(orderStatus));
    // }, [currentPage,orderStatus]);
    }, [currentPage]);

    React.useEffect(() => {
        const fetchFilteredOrders = async () => {
            const statusName = StatusType(orderStatus);
            if (searchPhone === '' && orderMonth === '' && orderYear === '' && statusName === '') {
                // If both search and brandIdList are empty, call getProducts
                getOrders(currentPage);
            } 
            else {
                // Else, call searchProducts with current search and filter values
                try {
                    setCurrentPage(1);
                    const res = await searchOrders(searchPhone, orderMonth,orderYear,statusName, currentPage);
                    if (res) {
                        setOrderData(res.data.items);
                        setTotalPages(res.data.totalPages);
                    }
                } catch (error) {
                    console.error("Failed to fetch filtered products", error);
                }
            }
      };
      fetchFilteredOrders();
    }, [searchPhone, orderMonth,orderYear, currentPage, orderStatus]);

    const handleChangePage = (event, page) => {
        setCurrentPage(page);
    };

    // const handleSave = async () => {
    //     try {
    //         if (current) {
    //             let res = await updateStatus(current.orderId, newStatus);
    //             if (res) {
    //                 setOpen(false);
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Error updating status:", error);
    //     } finally {
    //         getOrders(currentPage);
    //     }
    // };

    const handleSave = async () => {
        try {
            if (current) {
                let res = await updateStatus(current.orderId, newStatus);
                if (res) {
                    setOpen(false);
                    toast.success("Thay đổi Status của Order thành công!");
                }
            }
        } catch (error) {
            toast.error("Lỗi khi thay đổi Status!");
        } finally {
            getOrders(currentPage);
        }
      };

    const handleStatusChange = (status) => {
        setNewStatus(status);
    };

    const handleClearInputs = () => {
        setOrderYear('');
        setOrderMonth('');
        // setSearchPhone('');
        setOrderStatus(0);
    };

    return (
        <div className='card shadow border-0 p-3'>
            <div className='row cardFilters d-flex align-items-center'>
                <div className='col-md-3'>
                    <h4>SEARCH BY PHONE</h4>
                    <div className='searchProductWrapper d-flex align-items-center'>
                    <Search onSearch={handleSearchPhone} />
                    </div>
                </div>

                <div className='col-md-3'>
                    <h4>ORDER TIME</h4>
                    <div className='d-flex'>
                        <TextField
                            size='small'
                            id="outlined-basic"
                            className='w-50 me-2 custom-border'
                            type="number"
                            label="Year"
                            value={orderYear}
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                if (value >= 2021 && value <= currentYear) {
                                setOrderYear(value);
                                }
                            }}
                            inputProps={{ min: 2021, max: currentYear }}
                        />
                        <TextField
                            size='small'
                            id="outlined-basic"
                            className='w-50 me-2 custom-border'
                            type="number"
                            label="Month"
                            value={orderMonth}
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                if (value >= 1 && value <= 12) {
                                setOrderMonth(value);
                                }
                            }}
                            inputProps={{ min: 1, max: 12 }}
                        />
                    </div>
                </div>

                <div className='col-md-3'>
                    <h4>ORDER STATUS</h4>
                    <FormControl size='small' className='w-100 custom-border'>
                        <Select
                            // value={typeBy}
                            // onChange={handleTypeChange}
                            value={orderStatus} // Gán value từ state
                            onChange={(e) => setOrderStatus(e.target.value)} // Cập nhật state khi value thay đổi
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            className='w-100'
                            >
                            <MenuItem value={0}>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Processing</MenuItem>
                            <MenuItem value={2}>Departed from Warehouse</MenuItem>
                            <MenuItem value={3}>Shipping</MenuItem>
                            <MenuItem value={4}>Completed</MenuItem>
                            <MenuItem value={5}>Canceled</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='col-md-3'>
                    {/* <h4 className='pb-3'>CLEAR INPUT</h4> */}
                    <Button variant="outlined" color="secondary" onClick={handleClearInputs} className='btn-blue clear-btn'>
                            <MdOutlineClear/>
                    </Button>
                </div>
            </div>

            <div className='table-responsive mt-4'>
                <table className='table table-bordered v-align'>
                    <thead className='custom-thead'>
                        <tr>
                            <th className='bg-dark text-white'>Order ID</th>
                            <th className='bg-dark text-white'>Full Name</th>
                            <th className='bg-dark text-white'>Phone</th>
                            <th className='bg-dark text-white'>Address</th>
                            <th className='bg-dark text-white'>Order Date</th>
                            <th className='bg-dark text-white'>Status</th>
                            <th className='bg-dark text-white'>Total Amount</th>
                            <th className='bg-dark text-white'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersData.map(order => (
                            <tr key={order.orderId}>
                                <td className='center-text'>#{order.orderId}</td>
                                <td className='center-text' style={{ maxWidth: "150px" }}>{order.name}</td>
                                <td className='center-text' style={{ maxWidth: "100px" }}>{order.phone}</td>
                                <td className='center-text' style={{ maxWidth: "150px" }}>{order.address}</td>
                                <td className='center-text'>{new Date(order.orderDate).toLocaleDateString('en-GB')}</td>
                                <td className='center-text'>
                                    <span style={{
                                        color: order.status === 'Completed' 
                                            ? 'green' 
                                            : order.status === 'Canceled' 
                                                ? 'red' 
                                                : 'grey'
                                    }}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className='center-text'>{order.totalAmount.toLocaleString('vi-VN')} VNĐ</td>
                                <td className='custom-td p-0 w-1'>
                                    <div className='actions d-flex align-items-center justify-content-between'>
                                        <Link to={`/Orders/Details/${order.orderId}`}>
                                            <Button className="secondary" color="secondary"><FaEye /></Button>
                                        </Link>
                                        <Button className="success" color="success" onClick={() => handleClickOpen(order)} aria-hidden="false" ><FaPencil /></Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex tableFooter">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handleChangePage}
                        className='pagination'
                        showFirstButton
                        showLastButton
                    />
                </div>
                <EditDialog
                    open={open}
                    handleClose={handleClose}
                    current={current}
                    setCurrent={setCurrent}
                    handleSave={handleSave}
                    onStatusChange={handleStatusChange}
                />
                <ToastContainer />
            </div>
        </div>
    );
};

export default OrderTable;
