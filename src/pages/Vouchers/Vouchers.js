import React from 'react';
import { FaHome } from "react-icons/fa";
// import { FaHome } from "react-icons/fa";
import { Breadcrumbs } from '@mui/material';
// import UserTable from './components/UserTable';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { fetchAllVouchers } from '../../services/VoucherService';


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

const Vouchers = () => {
    // const token = localStorage.getItem("token");

   

    const [vouchersData, setVouchersData] = React.useState([]);

    const getVouchers = async () => {

      
    //   let res = await fetchAllUsers(page,token);
        let res = await fetchAllVouchers();
        if (res) {
        // pull về thì sửa gỡ command .items 
            setVouchersData(res.data);
        // setTotalPages(res.data.totalPages);


        // setProductsData(res.data);
        // setTotalPages(5);
        // console.log(res.data);
        }
    };
    
        // Gọi API fetchProduct
        React.useEffect(() => {
        //   getProducts(currentPage,token);
            getVouchers();
        // }, [currentPage,token]);
        }, []);

    return (
        <div className='right-content w-100'>

            <div className='card shadow border-0 w-100 flex-row p-4'>
                    <h5 className='mb-0'>Vouchers List</h5>    
                    <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                        <StyledBreadcrumb component='a' href='#' label='Dashboard' icon={<FaHome fontSize='small'/>}/>
                        <StyledBreadcrumb label='Vouchers'/>
                    </Breadcrumbs>
            </div>

            <div className='card shadow border-0 p-3 mt-4'>


                {/* table product data */}
                <div className='table-responsive mt-4'>
                    <table className='table table-bordered v-align'>
                        {/* table head */}
                        <thead className='custom-thead'>
                            <tr>
                                <th className='bg-dark text-white'>Voucher ID</th>
                                <th className='bg-dark text-white'>Voucher Code</th>
                                {/* <th className='bg-dark text-white'>Quantity</th> */}
                                <th className='bg-dark text-white'>Create Date</th>
                                <th className='bg-dark text-white'>Expired Date</th>
                                <th className='bg-dark text-white'>Minimum Purchase</th>
                                <th className='bg-dark text-white'>Discount Percentage</th>
                            </tr>
                        </thead>
                        {/* table body */}
                        
                        <tbody>
                            {vouchersData.map(voucher => (
                                <tr key={voucher.voucherId}>
                                    <td className='center-text'>#{voucher.voucherId}</td>
                                    <td className='center-text'>{voucher.voucherCode}</td>
                                    {/* <td className='center-text' >{voucher.quantity}</td> */}
                                    <td className='center-text'>
                                        {new Date(voucher.releaseDate).toLocaleDateString('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        })}
                                    </td>
                                    <td className='center-text'>
                                        {new Date(voucher.expiredDate).toLocaleDateString('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        })}
                                    </td>
                                    <td className='center-text' style={{ maxWidth: "150px" }}>{voucher.minCost.toLocaleString('vi-VN') + ' VNĐ'}</td>
                                    <td className='center-text' style={{ maxWidth: "50px" }}>{voucher.discount * 100 + "%"}</td>
                                    {/* <td className='center-text'>{new Date(order.orderDate).toLocaleDateString('en-GB')}</td> */}
                                </tr>
                            ))}
                        </tbody>


                    </table>
                    {/* Pagination */}
                        {/* <div className="d-flex tableFooter">
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handleChangePage}
                                className='pagination'
                                showFirstButton
                                showLastButton
                            />
                        </div> */}
                        {/* edit dialog  */}
                        {/* <EditDialog
                            open={open}
                            handleClose={handleClose}
                            current={current}
                            setCurrent={setCurrent}
                            handleSave={handleSave}
                        /> */}
                </div>
            </div>
        </div>
    );
};

export default Vouchers;
