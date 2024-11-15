import React, { useContext, useEffect } from 'react';
import DashboardBox from './components/dashboardBox';
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineEventNote } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import piechart from '../../assets/images/piechart.png';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { MyContext } from '../../App';
import DashboardProductTable from './components/dashboardProductTable';
import { fetchBestSellers } from '../../services/OrderService';
import { FaRedo } from 'react-icons/fa';
import { getStatistics } from '../../services/DashboardService';
import Pagination from '@mui/material/Pagination';
import { getLowStock } from '../../services/ProductService';
import DashboardTable from './components/dashboardTable';


const Dashboard = () => {
    // const saleNumber = '1,000,000,000';
    const [data, setData] = React.useState({
        bookCount: 0,
        orderCount: 0,
        userCount: 0,
        totalOrderAmount: 0,
    });

    const [showBy, setshowBy] = React.useState('');  // for Best Selling Products
    // const [showBy1, setshowBy1] = React.useState(''); // for Overstocked Products
    const [amount, setAmount] = React.useState(5);   // Best Selling Products
    // const [amount1, setAmount1] = React.useState(5);  // Overstocked Products
    const [lowStock,setLowStock] = React.useState([]);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

    const context = useContext(MyContext);

    const [bestSeller, setBestSeller] = React.useState([]);
    // const [overstockedProducts, setOverstockedProducts] = React.useState([]);

    useEffect(() => {
        context.setIsHideSidebarAndHeader(false);
        getBestSeller(amount); // Fetch Best Seller data
        getData();
        getLowStockBook(currentPage)
        // getOverstockedProducts(amount1); // Fetch Overstocked Products data
    // }, [context, amount, amount1]);
    }, [context, amount,currentPage]);

    const getBestSeller = async (amount) => {
        let res = await fetchBestSellers(amount);
        if (res) {
            setBestSeller(res.data);
        }
    };

    const getData = async () => {
        let res = await getStatistics();
        if (res) {
            setData(res.data);
        }
    };

    const getLowStockBook = async (page) => {

    //   let res = await fetchAllUsers(page,token);
        let res = await getLowStock(page);
        if (res) {
        // pull về thì sửa gỡ command .items 
            setLowStock(res.data.items);
            setTotalPages(res.data.totalPages);
        }
    };


    // const getOverstockedProducts = async (amount1) => {
    //     // Call the API to get overstocked products (assuming you have a similar function)
    //     let res = await fetchOverstockedProducts(amount1); // Replace with actual API call for overstocked products
    //     if (res) {
    //         setOverstockedProducts(res.data);
    //     }
    // };

    const handleShowChange = (event) => {
        const value = event.target.value;
        setshowBy(value);
        // Kiểm tra nếu chọn "None", set lại amount = 5
        setAmount(value === 0 ? 5 : value);
    };
    
    // const handleShowChange1 = (event) => {
    //     const value = event.target.value;
    //     setshowBy1(value);
    //     // Kiểm tra nếu chọn "None", set lại amount1 = 5
    //     setAmount1(value === 0 ? 5 : value);
    // };

    const handleReload = () => {
        getBestSeller(amount); // Call the function to reload best seller products
    };

    const handleReload1 = () => {
        setCurrentPage(1);
        getLowStockBook(currentPage); // Call the function to reload best seller products
    };

    const handleChangePage = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className='right-content w-100'>
                <div className='row dashboardBoxWrapperRow'>
                    <div className='col-md-8 pe-0'>
                        <div className='dashboardBoxWrapper d-flex'>
                            <DashboardBox color={["#1e3a8a","#93c5fd"]} content="Total User" totalNumber={data.userCount} icon={<FaUserCircle/>} growRate={true}/>
                            <DashboardBox color={["#6d28d9","#d8b4fe"]} content="Total Products" totalNumber={data.bookCount} icon={<FiShoppingBag/>} growRate={true}/>
                            <DashboardBox color={["#be185d","#f9a8d4"]} content="Total Orders" totalNumber={data.orderCount} icon={<MdOutlineEventNote/>} growRate={true}/>
                            <DashboardBox color={["#ea580c","#fdba74"]} content="Total Reviews" totalNumber={data.reviewCount} icon={<MdOutlineReviews/>} growRate={true}/>
                        </div>
                    </div>

                    <div className='col-md-4'>
                        <div className='box graphBox'>
                            <div className='d-flex align-items-center w-100 bottomEle'>
                                <h4 className='text-white'>Total Sales</h4>
                            </div>
                            <h3 className='text-white font-weight-bold'>{`${data.totalOrderAmount.toLocaleString('vi-VN')} VNĐ`}</h3>
                            <img src={piechart} alt='bookstore_logo'/>
                        </div>
                    </div>
                </div>
                
                {/* Best Selling */}
                <div className='card shadow border-0 p-3 mt-4'>
                    <h3 className='hd'>Best Selling Products</h3>
                    <div className='row cardFilters mt-3'>
                        <div className='col-md-3'>
                            <h4>SHOW BY</h4>
                            <FormControl size='small' className='w-100'>
                                <Select
                                    value={showBy}
                                    onChange={handleShowChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='w-100'
                                >
                                    {/* <MenuItem value={0}><em>None</em></MenuItem> */}
                                    <MenuItem value={5}>5 rows</MenuItem>
                                    <MenuItem value={10}>10 rows</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='col-md-3'>
                            <h4>Refresh Data</h4>
                            <button 
                                className="ms-3 btn btn-primary" 
                                onClick={handleReload}
                                title="Reload Best Sellers"
                            >
                                <FaRedo />
                            </button>
                        </div>
                    </div>
                    <DashboardProductTable productsData={bestSeller}/>
                </div>

                {/* Overstocked Products */}
                <div className='card shadow border-0 p-3 mt-4'>
                    <h3 className='hd'>Low Stock Products</h3>
                    <div className='row cardFilters mt-3'>
                        {/* <div className='col-md-3'>
                            <h4>SHOW BY</h4>
                            <FormControl size='small' className='w-100'>
                                <Select
                                    value={showBy1}
                                    onChange={handleShowChange1}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='w-100'
                                >
                                    {/* <MenuItem value={0}><em>None</em></MenuItem> */}
                                    {/* <MenuItem value={5}>5 rows</MenuItem>
                                    <MenuItem value={10}>10 rows</MenuItem>
                                </Select>
                            </FormControl> */}
                        {/* </div> */}
                        <div className='col-md-3'>
                            <h4>Refresh Data</h4>
                            <button 
                                className="ms-3 btn btn-primary" 
                                onClick={handleReload1}
                                title="Reload Best Sellers"
                            >
                                <FaRedo />
                            </button>
                        </div>
                    </div>
                    {/* <DashboardProductTable productsData={overstockedProducts}/> */}
                    <DashboardTable productsData={lowStock}/>
                    <div className="d-flex tableFooterDashboard">
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
        </div>
    );
};

export default Dashboard;
