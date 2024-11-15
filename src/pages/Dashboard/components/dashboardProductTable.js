import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { FaEye } from "react-icons/fa";
// import { FaPencil } from "react-icons/fa6";
// import { IoTrashBin } from "react-icons/io5";
// import Pagination from '@mui/material/Pagination';

const DashboardProductTable = ({productsData}) => {
    return (
        <div className='table-responsive mt-4'>
            <table className='table table-bordered v-align'>    
                {/* table head */}
                <thead className='custom-thead'>
                    <tr>
                        <th className='bg-dark text-white'>Id</th>
                        <th className='bg-dark text-white'>Book</th>
                        <th className='bg-dark text-white'>Author</th>
                        <th className='bg-dark text-white'>Price</th>
                        <th className='bg-dark text-white'>Rating</th>
                        <th className='bg-dark text-white'>Ordered</th>
                        <th className='bg-dark text-white'>Status</th>
                        <th className='bg-dark text-white'>Action</th>
                    </tr>
                </thead>
                {/* table body */}
                <tbody>
                    {productsData.map((product,index) => (
                        <tr key={product.booksDto.bookId}>
                            <td className='center-text'>#{product.booksDto.bookId}</td>
                            <td className='custom-td-product'>
                                <div className='d-flex productBox'>
                                    <div className='imgWrapper'>
                                        <img src={product.booksDto.image} alt='bookImg'/>
                                    </div>
                                    <div className='info ps-2 align-content-center'>
                                        <h6>{product.booksDto.title}</h6>
                                    </div>
                                </div>
                            </td>
                            <td className='center-text' style={{ maxWidth: "100px" }}>{product.booksDto.author_name}</td>
                            <td className='center-text' style={{ maxWidth: "80px" }}>{product.booksDto.price.toLocaleString('vi-VN')} VND</td>
                            <td className='center-text'>{product.booksDto.rating ?? 5} ★</td>
                            <td className='center-text' style={{ maxWidth: "20px" }}>{product.quantity}</td>
                            <td className='center-text' style={{ color: product.booksDto.isSale ? 'green' : 'red' }}>
                                {product.booksDto.isSale ? 'Đang bán' : 'Ngưng bán'}
                            </td>
                            <td className='custom-td p-0 w-1'>
                                <div className='actions d-flex align-items-center justify-content-center'>
                                    <Link to={`/Products/Details/${product.booksDto.bookId}`}>
                                        <Button className="secondary" color="secondary"><FaEye /></Button>
                                    </Link>
                                    {/* <Button className="error" color="error"><IoTrashBin /></Button> */}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardProductTable;
