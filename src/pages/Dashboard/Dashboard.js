import React, { useContext, useEffect } from 'react';
import DashboardBox from './components/dashboardBox';
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineEventNote } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosTimer } from "react-icons/io";
import Button from '@mui/material/Button'
import { BsThreeDotsVertical } from "react-icons/bs";
import piechart from '../../assets/images/piechart.png'
// import InputLabel from '@mui/material/InputLabel';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { FaEye } from "react-icons/fa";
// import { FaPencil } from "react-icons/fa6";
// import { IoTrashBin } from "react-icons/io5";
// import Pagination from '@mui/material/Pagination';
import { MyContext } from '../../App';
// import { Link } from 'react-router-dom';
import DashboardProductTable from './components/dashboardProductTable';
import GenreSelect from './components/GenreSelect';


const Dashboard = () => {

    const saleNumber = '1,000,000,000'

    const ITEM_HEIGHT = 48

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    // const [brandBy, setbrandBy] = React.useState('');
    const [showBy, setshowBy] = React.useState('');
    const [typeBy, settypeBy] = React.useState('');

    const context = useContext(MyContext)

    useEffect(() => {
        context.setIsHideSidebarAndHeader(false)
    },[context]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleShowChange = (event) => {
        setshowBy(event.target.value);
    };
    //   const handleBrandChange = (event) => {
    //     setbrandBy(event.target.value);
    // };
    const handleTypeChange = (event) => {
        settypeBy(event.target.value);
    };

    return (
        <div>
            <div className='right-content w-100'>
                {/* <h1>Dashboard</h1> */}
                <div className='row dashboardBoxWrapperRow'>
                    <div className='col-md-8 pe-0'>

                        <div className='dashboardBoxWrapper d-flex'>
                            <DashboardBox color={["#1e3a8a","#93c5fd"]} content="Total User" totalNumber="277" icon={<FaUserCircle/>} growRate={true}/>
                            <DashboardBox color={["#6d28d9","#d8b4fe"]} content="Total Products" totalNumber="320" icon={<FiShoppingBag/>} growRate={false}/>
                            <DashboardBox color={["#be185d","#f9a8d4"]} content="Total Orders" totalNumber="2432" icon={<MdOutlineEventNote/>} growRate={true}/>
                            <DashboardBox color={["#ea580c","#fdba74"]} content="Total Reviews" totalNumber="1345" icon={<MdOutlineReviews/>} growRate={false}/>
                        </div>

                    </div>

                    <div className='col-md-4'>
                        <div className='box graphBox'>
                            {/* <h1 className='text-white'>Total Sales</h1>
                             */}
                            <div className='d-flex align-items-center w-100 bottomEle'>
                                <h4 className='text-white'>Total Sales</h4>
                                <Button className='ms-auto toggleIcon' onClick={handleClick}>
                                    <BsThreeDotsVertical/>
                                </Button>
                                <Menu
                                    id="long-menu"
                                    MenuListProps={{'aria-labelledby': 'long-button',}}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    slotProps={{
                                    paper: {
                                        style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: '20ch',
                                        },
                                    },
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <IoIosTimer className='me-2'/>Last Day
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <IoIosTimer className='me-2'/>Last Week
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <IoIosTimer className='me-2'/>Last Month
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <IoIosTimer className='me-2'/>Last Year
                                    </MenuItem>
                                </Menu>
                            </div>

                            <h3 className='text-white font-weight-bold'>{`${saleNumber} VNĐ`}</h3>
                            <img src={piechart} alt='bookstore_logo'/>
                        </div>
                    </div>


                </div>

                <div className='card shadow border-0 p-3 mt-4'>
                    <h3 className='hd'>Best Selling Products</h3>
                    {/* select, filter product */}
                    <div className='row cardFilters mt-3'>

                        {/* show select */}
                        <div className='col-md-3'>
                            <h4>SHOW BY</h4>
                            <FormControl size='small' className='w-100'>
                                <Select
                                    value={showBy}
                                    onChange={handleShowChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    labelId="demo-simple-select-helper-label"
                                    className='w-100'
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={5}>5 rows</MenuItem>
                                    <MenuItem value={10}>10 rows</MenuItem>
                                    <MenuItem value={20}>20 rows</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        {/* Brand select */}
                        <div className='col-md-3'>
                            <h4>BRAND BY</h4>
                            <GenreSelect/>
                        </div>

                        {/* Type select */}
                        <div className='col-md-3'>
                            <h4>TYPE BY</h4>
                            <FormControl size='small' className='w-100'>
                                <Select
                                    value={typeBy}
                                    onChange={handleTypeChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='w-100'
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>N-Book</MenuItem>
                                    <MenuItem value={20}>E-Book</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    {/* table product data */}
                    <DashboardProductTable/>
                </div>


            </div>
        </div>
    )
}

export default Dashboard