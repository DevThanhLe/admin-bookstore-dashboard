import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from '@mui/material';
// import { FaEye } from "react-icons/fa";
// import { FaPencil } from "react-icons/fa6";
// import { IoTrashBin } from "react-icons/io5";
// import Pagination from '@mui/material/Pagination';
import { FaHome } from "react-icons/fa";
import { Breadcrumbs } from '@mui/material';
import UserTable from './components/UserTable';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Search from '../../components/Search/Search';
import { fetchAllUsers,searchUsers } from '../../services/UserService';
import Pagination from '@mui/material/Pagination';



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

const User = () => {
    const [searchInputNameEmail, setSearchInputNameEmail] = React.useState('');
    const [searchPhone, setSearchPhone] = React.useState('');

    // const [checkLoadData, setCheckLoadData] = React.useState(false);

    const [usersData, setUsersData] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1); // Trang hiện tại bắt đầu từ 1
    const [totalPages, setTotalPages] = React.useState(1); // Tổng số trang mặc định

    const handleSearchInput = (searchTerm) => {
      setSearchInputNameEmail(searchTerm)
    };
    
    const handleSearchPhone = (searchTerm) => {
      setSearchPhone(searchTerm)
    };

    const handleLoadData = (value) => {
      if (value) {
          getUsers(currentPage); // Gọi lại hàm lấy dữ liệu
          // setCheckLoadData(false); // Đặt lại về false sau khi load xong
      }
    };

    const getUsers = async (page) => {

    //   let res = await fetchAllUsers(page,token);
      let res = await fetchAllUsers(page);
      if (res) {
        // pull về thì sửa gỡ command .items 
        setUsersData(res.data.items);
        setTotalPages(res.data.totalPages);
      }
    };

    // Gọi API fetchProduct
    React.useEffect(() => {
    //   getProducts(currentPage,token);
        getUsers(currentPage);
    // }, [currentPage,token]);
    }, [currentPage]);

    React.useEffect(() => {
      const fetchSearchUsers = async () => {
        if (searchInputNameEmail === '' && searchPhone === '') {
            // If both search and brandIdList are empty, call getProducts
            // getProducts(currentPage, token);
            getUsers(currentPage);

        } else {
            // Else, call searchProducts with current search and filter values
            try {
                setCurrentPage(1);
                const res = await searchUsers(searchInputNameEmail,searchPhone, currentPage);
                if (res) {
                    setUsersData(res.data.items);
                    setTotalPages(res.data.totalPages);
                }
            } catch (error) {
                console.error("Failed to fetch filtered products", error);
            }
        }
    };

    fetchSearchUsers();
  }, [searchInputNameEmail, searchPhone, currentPage]);

    const handleChangePage = (event, page) => {
      setCurrentPage(page);
    };

    return (
        <div className='right-content w-100'>

            <div className='card shadow border-0 w-100 flex-row p-4'>
                    <h5 className='mb-0'>Users List</h5>
                    <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                        <StyledBreadcrumb component='a' href='#' label='Dashboard' icon={<FaHome fontSize='small'/>}/>
                        <StyledBreadcrumb label='Users'/>
                    </Breadcrumbs>
            </div>

            <div className='card shadow border-0 p-3 mt-4'>
              <div className='row cardFilters d-flex align-items-center'>
                <div className='col-md-3'>
                    <h4>SEARCH BY EMAIL</h4>
                    <div className='searchProductWrapper d-flex align-items-center'>
                      <Search onSearch={handleSearchInput}/>
                    </div>
                </div>
                <div className='col-md-3'>
                    <h4>SEARCH BY PHONE</h4>
                    <div className='searchProductWrapper d-flex align-items-center'>
                      <Search onSearch={handleSearchPhone}/>
                    </div>
                </div>
              </div>

                {/* table product data */}
              <UserTable usersData={usersData} onSuccess={handleLoadData}/>
              {/* Pagination */}
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
            </div>
        </div>
    );
};

export default User;
