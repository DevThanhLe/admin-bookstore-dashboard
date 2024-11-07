import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { IoSearch } from "react-icons/io5";

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
        // console.log(value);
    };

    return(
        <div className='searchBox position-relative d-flex align-items-center'>
            <IoSearch className='me-2'/>
            <input 
                type='text' 
                placeholder='Search...'
                value={searchTerm}
                onChange={handleInputChange}
            />
        </div>
    )
}

export default Search;
