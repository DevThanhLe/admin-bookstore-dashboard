import React from 'react';
// import { BsThreeDotsVertical } from "react-icons/bs";
// import Button from '@mui/material/Button'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { IoIosTimer } from "react-icons/io";

const DashboardBox = (props) => {

    const content = props.content ? props.content : ''
    const totalNumber = props.totalNumber ? props.totalNumber : '0'

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

        </div>
    )
}

export default DashboardBox