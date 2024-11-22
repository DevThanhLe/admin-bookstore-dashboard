import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../../assets/images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
// import { FaShieldAlt } from "react-icons/fa";
// import { RiAccountCircleFill } from "react-icons/ri";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
// import { IoMdNotifications } from "react-icons/io";
// import Divider from '@mui/material/Divider';
import { MdOutlineMenu } from "react-icons/md";
import { MyContext } from '../../App';
// import { productsData } from '../../services/ProductService';

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const [isOpenNotificationDrop, setisOpenNotificationDrop] = React.useState(null);

    const openMyAccount = Boolean(anchorEl);
    // const openNotification = Boolean(isOpenNotificationDrop);

    const username = localStorage.getItem("username");

    const context = useContext(MyContext);

    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const handleOpenNotifications = (event) => {
    //     setisOpenNotificationDrop(event.currentTarget);
    // };
    // const handleCloseNotifications = () => {
    //     setisOpenNotificationDrop(null);
    // };

    const handleLogout = () => {
        // Xóa token khỏi localStorage
        window.localStorage.removeItem("token");
        // Điều hướng trở lại trang đăng nhập hoặc trang chủ
        navigate("/login");
        // Hiển thị thông báo đăng xuất thành công
        // toast.success("Logout successful");
    };

    // Lọc data book có quantity < 10
    // const lowStockProducts = productsData.filter(product => product.quantity < 10);

    return (
        <div>
            <header className='d-flex align-items-center'>
                <div className='container-fluid w-100'>
                    <div className='row d-flex align-items-center '>
                        <div className='col-2'>
                            <Link to={'/Dashboard'} className='d-flex align-items-center logo'>
                                <img src={logo} alt='bookstore_logo'/>
                                <span className="ms-2">BOOKHUB</span>
                            </Link>
                        </div>

                        <div className='col-2 d-flex align-items-center'>
                            <Button className='rounded-circle me-4' onClick={() => context.setIsToggleSidebar(!context.isToggleSidebar)}>
                                {context.isToggleSidebar === false ? <MdMenuOpen /> : <MdOutlineMenu />}
                            </Button>
                        </div>

                        <div className='col-8 d-flex align-items-center justify-content-end'>
                            {/* notificatio  */}

                            <div className='myAccWrapper d-flex align-items-center'>
                                <Button className='myAcc d-flex align-items-center' onClick={handleClick}>
                                    <div className='userImg'>
                                        <span className='rounded-circle'>
                                            <img src='https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg' alt='avatar' />
                                        </span>
                                    </div>

                                    <div className='userInfo'>
                                        <h4>Hi, {username}</h4>
                                        {/* <p className='mb-0'>lexuanthanh190503@gmail.com</p> */}
                                    </div>
                                </Button>

                                {/* Menu Account */}
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={openMyAccount}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    {/* <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <RiAccountCircleFill />
                                        </ListItemIcon>
                                        My Account
                                    </MenuItem> */}

                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <RiLogoutBoxRFill />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
