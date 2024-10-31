import React from 'react';
// import { BsThreeDotsVertical } from "react-icons/bs";
import Button from '@mui/material/Button'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { IoIosTimer } from "react-icons/io";

const DashboardBox = (props) => {

    const content = props.content ? props.content : ''
    const totalNumber = props.totalNumber ? props.totalNumber : '0'

    // const ITEM_HEIGHT = 48

    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };


    return(
        <div className='dashboardBox' style={{
            backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`

        }}>
            
            {
                props.growRate === true ?

                <span className='chartArrow'><TrendingUpIcon/></span>

                :

                <span className='chartArrow'><TrendingDownIcon/></span>
            }



            <div className='d-flex w-100 mt-0'>
                <div className='col1'>
                    <h4 className='text-white mb-0'>{content}</h4>
                    <span className='text-white'>{totalNumber}</span>
                </div>

                <div className='ms-auto'>
                    <span className='dashboardBoxIcon'>
                        {props.icon ? props.icon : ''}
                    </span>
                </div>
            </div>

            {/* <div className='d-flex align-items-center w-100 bottomEle'>
                <h6 className='text-white mb-0 mt-0'>Last month</h6>
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
                </Menu> */}
            {/* </div> */}

        </div>
    )
}

export default DashboardBox