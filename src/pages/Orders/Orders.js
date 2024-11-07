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
import {TextField} from '@mui/material';
import Search from '../../components/Search/Search';
// import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
    const currentYear = new Date().getFullYear();
    const maxDate = `${currentYear}-12`; // Giới hạn là tháng 12 của năm hiện tại
    return (
        <div className='right-content w-100'>

            <div className='card shadow border-0 w-100 flex-row p-4'>
                    <h5 className='mb-0'>Orders List</h5>
                    <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                        <StyledBreadcrumb component='a' href='#' label='Dashboard' icon={<FaHome fontSize='small'/>}/>
                        <StyledBreadcrumb label='Orders'/>
                    </Breadcrumbs>
            </div>

            <div className='card shadow border-0 p-3 mt-4'>

                {/* table product data */}
                <div className='row cardFilters d-flex align-items-center'>
                  <div className='col-md-3'>
                      <h4>SEARCH</h4>
                      <div className='searchProductWrapper d-flex align-items-center'>
                        <Search />
                      </div>
                  </div>
      
                  <div className='col-md-3'>
                    <h4>ORDER TIME</h4>
                    <TextField size='small' className='w-100 selectCustomBorder' type="month" fullWidth inputProps={{ max: maxDate }}/>
                  </div>

                  <div className='col-md-3'>
                    <h4>ORDER STATUS</h4>
                    <FormControl size='small' className='w-100'>
                      <Select
                          // value={typeBy}
                          // onChange={handleTypeChange}
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          className='w-100'
                          >
                          {/* <MenuItem value="">
                              <em>None</em>
                          </MenuItem> */}
                          <MenuItem value={10}>Đang xử lý</MenuItem>
                          <MenuItem value={20}>Đã xuất kho</MenuItem>
                          <MenuItem value={30}>Đang giao</MenuItem>
                          <MenuItem value={40}>Hoàn thành</MenuItem>
                          <MenuItem value={50}>Hủy</MenuItem>
                      </Select>
                  </FormControl>
                  </div>
                </div>
                <OrderTable/>
            </div>
        </div>
    );
};

export default Orders;
