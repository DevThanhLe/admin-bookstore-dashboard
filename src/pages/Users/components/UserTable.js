import React from 'react';
// import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
// import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import Pagination from '@mui/material/Pagination';
import { fetchAllUsers } from '../../../services/UserService';
import { FaEye } from "react-icons/fa";

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

    // const [open, setOpen] = React.useState(false);
    // const [current, setCurrent] = React.useState(null);

    // const handleClickOpen = (order) => {
    //     setCurrent(order);
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const handleSave = () => {
    //     // Save the changes here, you might need to update the state or make an API call
    //     // console.log("Saved Data:", current);  // log ra dữ liệu đã chỉnh sửa
    //     const { userId, orderItems, orderId, ...dataToSave } = current; // loại bỏ orderItems và orderId

    //     console.log("Saved Data:", dataToSave); // log ra dữ liệu đã chỉnh sửa
    //     setOpen(false);
    // };

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
                        <th className='bg-dark text-white'>User ID</th>
                        <th className='bg-dark text-white'>FullName</th>
                        <th className='bg-dark text-white'>Email</th>
                        <th className='bg-dark text-white'>Phone</th>
                        <th className='bg-dark text-white'>Address</th>
                        <th className='bg-dark text-white'>Action</th>
                    </tr>
                </thead>
                {/* table body */}
                
                <tbody>
                    {usersData.map(user => (
                        <tr key={user.userId}>
                            <td className='center-text'>#{user.userId}</td>
                            <td className='center-text' style={{ maxWidth: "150px" }}>{user.fullname}</td>
                            <td className='center-text' style={{ maxWidth: "100px" }}>{user.email}</td>
                            <td className='center-text' style={{ maxWidth: "100px" }}>{user.phone}</td>
                            <td className='center-text' style={{ maxWidth: "150px" }}>{user.address}</td>
                            {/* <td className='center-text'>{new Date(order.orderDate).toLocaleDateString('en-GB')}</td> */}
                            <td className='custom-td p-0 w-1'>
                                <div className='actions d-flex align-items-center justify-content-between'>
                                    <Button className="secondary" color="secondary"><FaEye /></Button>
                                    {/* <Button className="success" color="success" onClick={() => handleClickOpen(user)} aria-hidden="false" ><FaPencil /></Button> */}
                                    <Button className="success" color="success" aria-hidden="false" ><FaPencil /></Button>
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
                {/* edit dialog  */}
                {/* <EditDialog
                    open={open}
                    handleClose={handleClose}
                    current={current}
                    setCurrent={setCurrent}
                    handleSave={handleSave}
                /> */}
        </div>
    );
};

export default UserTable;
