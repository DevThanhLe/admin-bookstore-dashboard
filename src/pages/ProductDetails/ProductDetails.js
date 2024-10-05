import { Breadcrumbs } from '@mui/material';
import React from 'react';
import { FaHome } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

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

                <div className='card'>
                    <br/>
                    <br/>
                    <br/>
                    <div className='row'>
                        
                        <div className='col md-4'>

                        </div>

                        <div className='col md-8'>
                            
                        </div>

                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default ProductDetails