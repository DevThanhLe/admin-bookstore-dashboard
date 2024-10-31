import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../../assets/images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { FaShieldAlt } from "react-icons/fa";
// import { RiAccountCircleFill } from "react-icons/ri";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import Divider from '@mui/material/Divider';
import { MdOutlineMenu } from "react-icons/md";
import { MyContext } from '../../App';
import { productsData } from '../../services/ProductService';

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isOpenNotificationDrop, setisOpenNotificationDrop] = React.useState(null);

    const openMyAccount = Boolean(anchorEl);
    const openNotification = Boolean(isOpenNotificationDrop);

    const context = useContext(MyContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenNotifications = (event) => {
        setisOpenNotificationDrop(event.currentTarget);
    };
    const handleCloseNotifications = () => {
        setisOpenNotificationDrop(null);
    };

    // Lọc data book có quantity < 10
    const lowStockProducts = productsData.filter(product => product.quantity < 10);

    return (
        <div>
            <header className='d-flex align-items-center'>
                <div className='container-fluid w-100'>
                    <div className='row d-flex align-items-center '>
                        <div className='col-2'>
                            <Link to={'/Dashboard'} className='d-flex align-items-center logo'>
                                <img src={logo} alt='bookstore_logo'/>
                                <span className="ms-2">BOOKSTORE</span>
                            </Link>
                        </div>

                        <div className='col-2 d-flex align-items-center'>
                            <Button className='rounded-circle me-4' onClick={() => context.setIsToggleSidebar(!context.isToggleSidebar)}>
                                {context.isToggleSidebar === false ? <MdMenuOpen /> : <MdOutlineMenu />}
                            </Button>
                        </div>

                        <div className='col-8 d-flex align-items-center justify-content-end'>
                            <div className='dropdownwrapper position-relative'>
                                <Button className='rounded-circle me-3' onClick={handleOpenNotifications}><IoMdNotifications /></Button>

                                {/* Notifications Het hang */}
                                <Menu
                                    anchorEl={isOpenNotificationDrop}
                                    className='notifications dropdown_list'
                                    id='notifications'
                                    open={openNotification}
                                    onClose={handleCloseNotifications}
                                    onClick={handleCloseNotifications}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <div className='head ps-3 pb-0'>
                                        <h4>Notifications</h4>
                                    </div>

                                    <Divider className='custom_divider mb-2' />

                                    {/* Render notifications theo điều kiện  */}
                                    {lowStockProducts.length > 0 ? (
                                        <div>
                                            {lowStockProducts.slice(0, 3).map(product => (
                                                <MenuItem key={product.id} onClick={handleCloseNotifications}>
                                                    <div className='d-flex align-items-center'>
                                                        <div className='notiWrapper'>
                                                            <span className='noti-product-img'>
                                                                <img src={product.image} alt={product.name} />
                                                            </span>
                                                        </div>

                                                        <div className='dropdownInfo'>
                                                            <h4>
                                                                <span>
                                                                    <b>{product.name}</b>
                                                                    <h5>Almost out of stock</h5>
                                                                    <p>Remaining quantity: {product.quantity}</p>
                                                                </span>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </MenuItem>
                                            ))}
                                            {lowStockProducts.length > 3 && (
                                                // <MenuItem onClick={() => { /* Handle view all action */ }}>
                                                <div className='d-flex align-items-center justify-content-center w-100 pe-2 ps-2 pt-2'>
                                                    <Button className='btn-blue w-100 ps-2 pe-2'>View All</Button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className='ps-3 pb-0'>
                                            <h5>Chưa có thông báo mới nhất nào</h5>
                                        </div>
                                    )}
                                </Menu>
                            </div>

                            <div className='myAccWrapper d-flex align-items-center'>
                                <Button className='myAcc d-flex align-items-center' onClick={handleClick}>
                                    <div className='userImg'>
                                        <span className='rounded-circle'>
                                            <img src='https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg' alt='avatar' />
                                        </span>
                                    </div>

                                    <div className='userInfo'>
                                        <h4>Admin XuTha</h4>
                                        <p className='mb-0'>lexuanthanh190503@gmail.com</p>
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

                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <FaShieldAlt />
                                        </ListItemIcon>
                                        Reset Password
                                    </MenuItem>

                                    <MenuItem onClick={handleClose}>
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
