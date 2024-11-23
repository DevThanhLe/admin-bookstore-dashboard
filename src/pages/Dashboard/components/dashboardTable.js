import React from 'react';
import { Button } from '@mui/material';
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
}

const dashboardTable = ({ productsData, check }) => {

    const bookType = (typeBookId) => {
        switch (typeBookId) {
            case 1:
                return "Nbook";
            case 2:
                return "Ebook";
            default:
                return "Unknown";
        }
    };

    return (
        <div className='table-responsive mt-4'>
            {productsData.length === 0 ? (
                <div className="text-center">
                    <p>Chưa có dữ liệu</p>
                </div>
            ) : (
                <table className='table table-bordered v-align'>
                    {/* table head */}
                    <thead className='custom-thead'>
                        <tr>
                            <th className='bg-dark text-white'>ID</th>
                            <th className='bg-dark text-white'>Book</th>
                            <th className='bg-dark text-white'>Author</th>
                            <th className='bg-dark text-white'>Upload Date</th>
                            <th className='bg-dark text-white'>Type Book</th>
                            <th className='bg-dark text-white'>Inventory</th>
                            <th className='bg-dark text-white'>Price</th>
                            <th className='bg-dark text-white'>Rating</th>
                            <th className='bg-dark text-white'>Action</th>
                        </tr>
                    </thead>
                    {/* table body */}
                    <tbody>
                        {productsData.map(product => (
                            <tr key={product.bookId}>
                                <td className='center-text'>#{product.bookId}</td>
                                <td className='custom-td-product'>
                                    <div className='d-flex productBox'>
                                        <div className='imgWrapper'>
                                            <img src={product.image} alt='bookImg' />
                                        </div>
                                        <div className='info ps-2 align-content-center'>
                                            <h6>{product.title}</h6>
                                        </div>
                                    </div>
                                </td>
                                <td className='center-text' style={{ maxWidth: "130px" }}>{product.author_name}</td>
                                <td className='center-text' style={{ maxWidth: "130px", color: check === 1 ? "red" : "inherit" }}>{formatDate(product.uploadDate)}</td>
                                <td className='center-text' style={{ maxWidth: "150px" }}>{bookType(product.typeBookId)}</td>
                                <td className='center-text' style={{ maxWidth: "150px", color: check === 0 ? "red" : "inherit" }}>{product.quantity}</td>
                                <td className='center-text' style={{ maxWidth: "100px" }}>{product.price.toLocaleString('vi-VN')} VNĐ</td>
                                <td className='center-text' style={{ maxWidth: "100px" }}>{product.rating ?? 5} ★</td>
                                <td className='custom-td p-0 w-1'>
                                    <div className='actions d-flex align-items-center justify-content-center'>
                                        <Link to={`/Products/Details/${product.bookId}`}>
                                            <Button className="secondary" color="secondary"><FaEye /></Button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default dashboardTable;
