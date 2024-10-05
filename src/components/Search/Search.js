import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { IoSearch } from "react-icons/io5";

const Search = () => {
    return(
        <div className='searchBox position-relative d-flex algin-items-center'>
            <IoSearch className='me-2'/>
            <input type='text' placeholder='Search...'/>
        </div>
    )
}

export default Search