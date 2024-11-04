import React from 'react';
// import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
// import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import Pagination from '@mui/material/Pagination';
import { fetchAllUsers } from '../../../services/UserService';

// const usersData = [
//     {
//         id: 1,
//         name: "Sống để kể lại những anh hùng",
//         brand: "History",
//         type: "N-Book",
//         price: "250,000",
//         rating: "4.5",
//         order: 392,
//         image: "https://book365-bd0597d52b2112b2088efaaa03918d68.s3.ap-southeast-1.amazonaws.com/disk/976/976c937c348f90e844b73da08209084f/f60b2f81dc59ac9e6083682c964d94f8",
//     },
//     {
//         id: 2,
//         name: "Báo chí truyền thóng - Những góc tiếp cận",
//         brand: "Education",
//         type: "N-Book",
//         price: "182,000",
//         rating: "4.7",
//         order: 320,
//         image: "https://book365-bd0597d52b2112b2088efaaa03918d68.s3.ap-southeast-1.amazonaws.com/disk/45b/45b6b0f4788e029611ce97ea6f2e2eae/1003263114617edaa6d7617f1f23ac93",
//     },
//     {
//         id: 3,
//         name: "Chia sẻ từ trái tim",
//         brand: "Romance",
//         type: "E-Book",
//         price: "126,000",
//         rating: "4.3",
//         order: 290,
//         image: "https://cdn0.fahasa.com/media/catalog/product/c/h/chiasetutraitim-bia_1.jpg?_gl=1*gwbaoo*_gcl_aw*R0NMLjE3MjU3OTA4NTQuQ2owS0NRandsdlcyQmhEeUFSSXNBRG5JZS1JN0FnZDFOMHZhZkpEWlhLeUhsRnd2aXdEd0R0T0ZReWZvOWFIbHozZmsyOHB6UTVmT3F3WWFBaWxjRUFMd193Y0I.*_gcl_au*MTcwNTIzOTU3Ny4xNzI1NzkwODQ4*_ga*MTYwMDc1MzIzOS4xNzI1NzkwODQ4*_ga_460L9JMC2G*MTcyNzAxNjE3OC4yLjEuMTcyNzAxNjUyMy4zMC4wLjI4NTExOTIyMw..",
//     },
//     {
//         id: 4,
//         name: "Thám tử lừng danh Conan - tập 103",
//         brand: "Manga",
//         type: "N-Book",
//         price: "23,000",
//         rating: "4.6",
//         order: 288,
//         image: "https://cdn0.fahasa.com/media/catalog/product/t/h/tham_tu_lung_danh_conan_bia_tap_103.jpg?_gl=1*1dy8o2w*_gcl_aw*R0NMLjE3MjU3OTA4NTQuQ2owS0NRandsdlcyQmhEeUFSSXNBRG5JZS1JN0FnZDFOMHZhZkpEWlhLeUhsRnd2aXdEd0R0T0ZReWZvOWFIbHozZmsyOHB6UTVmT3F3WWFBaWxjRUFMd193Y0I.*_gcl_au*MTcwNTIzOTU3Ny4xNzI1NzkwODQ4*_ga*MTYwMDc1MzIzOS4xNzI1NzkwODQ4*_ga_460L9JMC2G*MTcyNzAxNjE3OC4yLjEuMTcyNzAxNjUyMy4zMC4wLjI4NTExOTIyMw..",
//     },
//     {
//         id: 5,
//         name: "Mèo con phiêu lưu ký",
//         brand: "Adventure",
//         type: "N-Book",
//         price: "85,000",
//         rating: "4.6",
//         order: 272,
//         image: "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/meo_con_phieu_luu_ky/2022_10_13_15_01_01_1-390x510.jpg",
//     },
// ];

const UserTable = () => {
    // const token = localStorage.getItem("token");

    // const [order, setOrder] = React.useState('');

    const [usersData, setUsersData] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1); // Trang hiện tại bắt đầu từ 1
    const [totalPages, setTotalPages] = React.useState(1); // Tổng số trang mặc định

    // Hàm gọi API để lấy dữ liệu sản phẩm
    // const getProducts = async (page,token) => {
    const getUsers = async (page) => {

      
    //   let res = await fetchAllUsers(page,token);
      let res = await fetchAllUsers(page);
      if (res) {
        // pull về thì sửa gỡ command .items 
        setUsersData(res.data.items);
        setTotalPages(res.data.totalPages);


        // setProductsData(res.data);
        // setTotalPages(5);
        // console.log(res.data);
      }
    };

    // Gọi API fetchProduct
    React.useEffect(() => {
    //   getProducts(currentPage,token);
        getUsers(currentPage);
    // }, [currentPage,token]);
    }, [currentPage]);

    const handleChangePage = (event, page) => {
      setCurrentPage(page);
    };

    return (
        <div className='table-responsive mt-4'>
            <table className='table table-bordered v-align'>
                {/* table head */}
                <thead className='custom-thead'>
                    <tr>
                        <th className='bg-dark text-white'>Id</th>
                        <th className='bg-dark text-white'>Name</th>
                        <th className='bg-dark text-white'>Email</th>
                        <th className='bg-dark text-white'>Phone</th>
                        <th className='bg-dark text-white'>Address</th>
                        {/* <th className='bg-dark text-white'>Rating</th>
                        <th className='bg-dark text-white'>Order</th> */}
                        <th className='bg-dark text-white'>Action</th>
                    </tr>
                </thead>
                {/* table body */}
                <tbody>
                    {usersData.map(user => (
                        <tr key={user.userId}>
                            <td className='center-text'>#{user.userId}</td>

                            <td className='custom-td-user'>
                                <div className='d-flex userBox'>
                                    {/* <div className='imgWrapper'>
                                        <img src={user.image} alt='bookImg'/>
                                    </div> */} 
                                    <div className='info center-text'> 
                                        <h6>{user.fullname}</h6>
                                    </div>
                                </div>
                            </td>

                            <td className='custom-td-user'>
                                <div className='d-flex userBox'>
                                    <div className='info center-text'> 
                                        <h6>{user.email}</h6>
                                    </div>
                                </div>
                            </td>

                            <td className='custom-td-userPhone'>
                                <div className='d-flex userPhoneBox'>
                                    <div className='info-phone center-text'> 
                                        <h6>{user.phone}</h6>
                                    </div>
                                </div>
                            </td>


                            {/* <td className='center-text'>
                                {user.address}
                            </td> */}
                            
                            <td className='custom-td-userAddress'>
                                <div className='d-flex userAddressBox'>
                                    <div className='info-address center-text'> 
                                        <h6>{user.address}</h6>
                                    </div>
                                </div>
                            </td>
                            {/* <td className='center-text'>{user.rating}</td>
                            <td className='center-text'>{user.order}</td> */}
                            <td className='custom-td p-0 w-1'>
                                <div className='actions d-flex align-items-center justify-content-between'>
                                    <Button className="success" color="success"><FaPencil /></Button>
                                    <Button className="error" color="error"><IoTrashBin /></Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="d-flex tableFooter">
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
    );
};

export default UserTable;
