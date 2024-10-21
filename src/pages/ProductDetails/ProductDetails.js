import { Breadcrumbs } from '@mui/material';
import React from 'react';
import { FaHome } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Slider from "react-slick";
import { FaUserPen } from "react-icons/fa6";

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

const ProductDetails = () => {

    var productSlỉderOptions = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:false
    };    

    var productSlỉderSmlOptions = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows:false
    };

    return(
        <div>
            <div className='right-content w-100'>
                <div className='card shadow border-0 w-100 flex-row p-4'>
                    <h5 className='mb-0'>Product View</h5>
                    <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                        <StyledBreadcrumb component='a' href='#' label='Dashboard' icon={<FaHome fontSize='small'/>}/>
                        <StyledBreadcrumb component='a' href='#' label='Product' deleteIcon={<MdDelete/>}/>
                        <StyledBreadcrumb label='Details'/>
                    </Breadcrumbs>
                </div>

                <div className='card productDetailsSection'>

                    <div className='row'>
                        {/* Slide product img */}
                        <div className='leftcontent col-md-5'>
                          <div className='sliderWrapper pt-3 pb-3 ps-4 pe-4'>
                            <h6 className='mb-4'>Product Gallery</h6>
                            {/* main prođuct img */}
                            <Slider {...productSlỉderOptions} className='sliderBig mb-2'>
                              <div className='slide-item'>
                                <img src='https://book365-bd0597d52b2112b2088efaaa03918d68.s3.ap-southeast-1.amazonaws.com/disk/976/976c937c348f90e844b73da08209084f/f60b2f81dc59ac9e6083682c964d94f8' alt='item'></img>
                              </div>
                            </Slider>
                            {/* slide prođuct img */}
                            <Slider {...productSlỉderSmlOptions} className='sliderSml'>
                              <div className='slide-item'>
                                <img src='https://book365-bd0597d52b2112b2088efaaa03918d68.s3.ap-southeast-1.amazonaws.com/disk/976/976c937c348f90e844b73da08209084f/f60b2f81dc59ac9e6083682c964d94f8' className='w-100' alt='item'></img>
                              </div>
                              <div className='slide-item'>
                                <img src='https://book365-bd0597d52b2112b2088efaaa03918d68.s3.ap-southeast-1.amazonaws.com/disk/976/976c937c348f90e844b73da08209084f/f60b2f81dc59ac9e6083682c964d94f8' className='w-100' alt='item'></img>
                              </div>
                              <div className='slide-item'>
                                <img src='https://book365-bd0597d52b2112b2088efaaa03918d68.s3.ap-southeast-1.amazonaws.com/disk/976/976c937c348f90e844b73da08209084f/f60b2f81dc59ac9e6083682c964d94f8' className='w-100' alt='item'></img>
                              </div>
                              <div className='slide-item'>
                                <img src='https://book365-bd0597d52b2112b2088efaaa03918d68.s3.ap-southeast-1.amazonaws.com/disk/976/976c937c348f90e844b73da08209084f/f60b2f81dc59ac9e6083682c964d94f8' className='w-100' alt='item'></img>
                              </div>
                            </Slider>
                          </div>
                        </div>
                        {/* product details  */}
                        <div className='rightcontent col md-7'>
                          <div className='pt-3 pb-3 pe-4'>
                            <h6 className='mb-4'>Product Details</h6>
                            {/* product name */}
                            <h4>Sống để kể lại những anh hùng</h4>

                            <div className='productInfo mt-3'>
                              <div className='row'>
                                {/* detail field */}
                                <div className='name-detail col-sm-5 d-flex align-items-center'>
                                  <FaUserPen className='icon'/>
                                  <span className='name'>Author</span>
                                </div>
                                {/* detail  */}
                                <div className='col-sm-7'>
                                <span className='name'>Nguyễn Quang Chánh</span>
                                </div>

                              </div>

                            </div>
                          </div>
                        </div>

                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default ProductDetails