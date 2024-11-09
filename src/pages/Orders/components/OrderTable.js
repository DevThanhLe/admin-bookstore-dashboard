import React, { useState } from 'react';
import { Button } from '@mui/material';
import { FaPencil } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import Pagination from '@mui/material/Pagination';
import EditDialog from './EditDialog';
import { Link } from 'react-router-dom';

const ordersData = [
    {
        "orderId": 1,
        "userId": 1,
        "orderDate": "2024-01-15T00:00:00",
        "status": "Completed",
        "totalAmount": 2000000,
        "name": "Lê Xuân Thành",
        "phone": "0901687315",
        "address": "274 Nguyễn Văn Tạo, Xã Long Thới, Huyện Nhà Bè, TP.HCM",
        "orderItems": [
            {
                "orderItemId": 1,
                "orderId": 1,
                "bookId": 2,
                "quantity": 1
            },
            {
                "orderItemId": 2,
                "orderId": 1,
                "bookId": 5,
                "quantity": 1
            }
        ]
    },
    {
        "orderId": 2,
        "userId": 1,
        "orderDate": "2024-05-20T00:00:00",
        "status": "Canceled",
        "totalAmount": 67000,
        "name": "Nguyễn Thị Mỹ Dung",
        "phone": "0901416370",
        "address": "08 Bế Văn Cấm, Phường Tân Kiểng, Quận 7, TP.HCM",
        "orderItems": [
            {
                "orderItemId": 1,
                "orderId": 1,
                "bookId": 2,
                "quantity": 1
            },
            {
                "orderItemId": 2,
                "orderId": 1,
                "bookId": 5,
                "quantity": 1
            }
        ]
    },
];

const OrderTable = () => {

    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(null);

    const handleClickOpen = (order) => {
        setCurrent(order);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        // Save the changes here, you might need to update the state or make an API call
        // console.log("Saved Data:", current);  // log ra dữ liệu đã chỉnh sửa
        const { userId, orderItems, orderId, ...dataToSave } = current; // loại bỏ orderItems và orderId

        console.log("Saved Data:", dataToSave); // log ra dữ liệu đã chỉnh sửa
        setOpen(false);
    };


    return (
        <div className='table-responsive mt-4'>
            <table className='table table-bordered v-align'>
                {/* table head */}
                <thead className='custom-thead'>
                    <tr>
                        <th className='bg-dark text-white'>Order ID</th>
                        <th className='bg-dark text-white'>User Name</th>
                        <th className='bg-dark text-white'>Phone</th>
                        <th className='bg-dark text-white'>Address</th>
                        <th className='bg-dark text-white'>Order Date</th>
                        <th className='bg-dark text-white'>Status</th>
                        <th className='bg-dark text-white'>Total Amount</th>
                        <th className='bg-dark text-white'>Action</th>
                    </tr>
                </thead>
                {/* table body */}
                
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
                                    color: order.status === 'Completed' ? 'green' : 'red'
                                }}>
                                    {order.status}
                                </span>
                            </td>
                            <td className='center-text'>{order.totalAmount.toLocaleString('vi-VN')} VND</td>
                            <td className='custom-td p-0 w-1'>
                                <div className='actions d-flex align-items-center justify-content-between'>
                                    <Link to='/Orders/Details'>
                                        <Button className="secondary" color="secondary"><FaEye /></Button>
                                    </Link>
                                    <Button className="success" color="success" onClick={() => handleClickOpen(order)} aria-hidden="false" ><FaPencil /></Button>
                                    <Button className="error" color="error"><IoTrashBin /></Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>


            </table>
            {/* Pagination */}
            <div className="d-flex tableFooter">
                <Pagination count={4} className='pagination' showFirstButton showLastButton />
            </div>
            {/* edit dialog  */}
            <EditDialog
                open={open}
                handleClose={handleClose}
                current={current}
                setCurrent={setCurrent}
                handleSave={handleSave}
            />
        </div>
    );
};

export default OrderTable;
