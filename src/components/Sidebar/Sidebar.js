import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { MdSpaceDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
// import { MdOutlineProductionQuantityLimits } from "react-icons/md";
// import { IoCart } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
// import { FaChartLine } from "react-icons/fa6";
import { Link } from 'react-router-dom';
// import { IoMdLogOut } from "react-icons/io";
// import { useContext } from 'react';
// import { MyContext } from '../../App';
import { PiNotepadFill } from "react-icons/pi";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { BiSolidDiscount } from "react-icons/bi";
import { FaCartFlatbed } from "react-icons/fa6";
import { PiPresentationChartFill } from "react-icons/pi";

const Sidebar = () => {

    const [activeTab, setActiveTab] = useState(0); 
    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

    const isOpenSubmenu = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu)
    }

    // const navigate = useNavigate();

    // const handleLogout = () => {
    //     // Xóa token khỏi localStorage
    //     window.localStorage.removeItem("token");
    //     // Điều hướng trở lại trang đăng nhập hoặc trang chủ
    //     navigate("/login");
    //     // Hiển thị thông báo đăng xuất thành công
    //     toast.success("Logout successful");
    // };

    // const context = useContext(MyContext)

    return(
        <div>
            {/* <h3>SiderBar</h3> */}
            <div className='sidebar'>
                {/* <ul> */}
                    {/* <li> */}
                        {/* dashboard button */}
                        <Link to="/Dashboard">
                            <Button className='w-100 d-flex justify-content-start align-items-center' onClick={() => isOpenSubmenu(0)}>
                                <span className='icon'>
                                    <MdSpaceDashboard/>
                                </span>
                                Dashboard
                                <span className='arrow'>
                                    <FaAngleRight/>
                                </span>
                            </Button>
                        </Link>
                        {/* users button */}
                        <Link to="/Users">
                            <Button className='w-100 d-flex justify-content-start align-items-center' onClick={() => isOpenSubmenu(1)}>
                                <span className='icon'>
                                    <FaUsers/>
                                </span>
                                Users
                                <span className='arrow'>
                                    <FaAngleRight/>
                                </span>
                            </Button>     
                        </Link>                 
                        {/* products button */}
                        {/* <Link to="/"> */}
                        <div>
                            <Button className={`w-100 d-flex justify-content-start align-items-center ${activeTab===2 && isToggleSubmenu === true ?'active':''}`} onClick={() => isOpenSubmenu(2)}>
                                <span className='icon'>
                                    <FaCartFlatbed/>
                                </span>
                                Products
                                <span className='arrow'>
                                    <FaAngleRight/>
                                </span>
                            </Button>

                            <div className={`submenuWrapper ${activeTab===2 && isToggleSubmenu === true ?'colapse':'colapsed'}`}>
                                <div className='submenu'>
                                    <li><Link to="/Products">Product List</Link></li>
                                    {/* <li><Link to="/Products/Details/1">Product View</Link></li> */}
                                    <li><Link to="/Products/Upload">Product Upload</Link></li>
                                </div>
                            </div>
                        </div>
                        {/* </Link> */}
                        {/* orders button */}
                        <Link to="/Orders">
                            <Button className='w-100 d-flex justify-content-start align-items-center'>
                                <span className='icon'>
                                    <PiNotepadFill/>
                                </span>
                                Orders
                                <span className='arrow'>
                                    <FaAngleRight/>
                                </span>
                            </Button>
                        </Link>
                        {/* Voucher button  */}
                        <div>
                            <Button className={`w-100 d-flex justify-content-start align-items-center ${activeTab===4 && isToggleSubmenu === true ?'active':''}`} onClick={() => isOpenSubmenu(4)}>
                                <span className='icon'>
                                    <BiSolidDiscount/>
                                </span>
                                Vouchers
                                <span className='arrow'>
                                    <FaAngleRight/>
                                </span>
                            </Button>

                            <div className={`submenuWrapper ${activeTab===4 && isToggleSubmenu === true ?'colapse':'colapsed'}`}>
                                <div className='submenu'>
                                    <li><Link to="/Vouchers">Voucher List</Link></li>
                                    {/* <li><Link to="/Products/Details/1">Product View</Link></li> */}
                                    <li><Link to="/Vouchers/Create">Voucher Create</Link></li>
                                </div>
                            </div>
                        </div>
                        {/* revenue button */}
                        <Link to="/Revenue">
                            <Button className='w-100 d-flex justify-content-start align-items-center'>
                                <span className='icon'>
                                    <PiPresentationChartFill/>
                                </span>
                                Revenue
                                <span className='arrow'>
                                    <FaAngleRight/>
                                </span>
                            </Button>
                        </Link>

                        {/* <div className='logoutWrapper'>
                            <div className='logoutBox'>
                                <Link to={'/Login'}>
                                    <Button variant="contained" onClick={handleLogout}><IoMdLogOut/>Logout</Button>
                                </Link>
                            </div>
                        </div> */}

                    {/* </li> */}
                {/* </ul> */}
            </div>
        </div>
    )
}

export default Sidebar