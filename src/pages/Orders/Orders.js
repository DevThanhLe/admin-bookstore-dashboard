import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from '@mui/material';
// import { FaEye } from "react-icons/fa";
// import { FaPencil } from "react-icons/fa6";
// import { IoTrashBin } from "react-icons/io5";
// import Pagination from '@mui/material/Pagination';
import { FaHome } from "react-icons/fa";
import { Breadcrumbs } from '@mui/material';
// import UserTable from './components/UserTable';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import OrderTable from './components/OrderTable';


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

const Orders = () => {


    return (
        <div className='right-content w-100'>

            <div className='card shadow border-0 w-100 flex-row p-4'>
                    <h5 className='mb-0'>Orders List</h5>
                    <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                        <StyledBreadcrumb component='a' href='#' label='Dashboard' icon={<FaHome fontSize='small'/>}/>
                        <StyledBreadcrumb label='Orders'/>
                    </Breadcrumbs>
            </div>

            {/* <div className='card shadow border-0 p-3 mt-4'> */}

                {/* table product data */}
                
            <OrderTable/>
            {/* </div> */}
        </div>
    );
};

export default Orders;
