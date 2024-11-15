import React from 'react';
// import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { FaEye } from "react-icons/fa";
// import { FaPencil } from "react-icons/fa6";
import { Link } from 'react-router-dom';
// import { IoTrashBin } from "react-icons/io5";
// import Pagination from '@mui/material/Pagination';
// import { fetchAllUsers } from '../../../services/UserService';
// import { FaEye } from "react-icons/fa";
// import DeleteDialog from './DeleteDialog';
// import { unActiveUser } from '../../../services/UserService';
// import { ToastContainer, toast } from 'react-toastify';
// import { FaLock } from "react-icons/fa";
// import { FaLockOpen } from "react-icons/fa";
// import EditDialog from './EditDialog';

const dashboardTable = ({productsData}) => {
    // const token = localStorage.getItem("token");
    // const [open, setOpen] = React.useState(false); // Open delete dialog
    // const [selectedUserId, setSelectedUserId] = React.useState(0); // Lưu userId được chọn
    // const [isAcitiveUser, setIsAcitiveUser] = React.useState(1); // Lưu userId được chọn
    // const [openEdit, setOpenEdit] = React.useState(false);
    // const [selectedUser, setSelectedUser] = React.useState(null);

    // const handleClickOpen = (userId) => {
    //     const user = usersData.find(user => user.userId === userId);
    //     if (user) {
    //         setIsAcitiveUser(user.isActive); // Cập nhật isAcitiveUser dựa trên trạng thái của user
    //     }
    
    //     setSelectedUserId(userId); // Lưu userId đã chọn
    //     setOpen(true); // Mở dialog

    //   };
    
    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const handleDelete = async (selectedUserId) => {
    //     try {
    //       let res = await unActiveUser(selectedUserId);
    //       if(res){
    //         setOpen(false);
    //         toast.success("Khóa tài khoản thành công!");
    //       }
    //       // console.log("Sản phẩm đã được xóa");
    //       // navigate('/Products');  // Chuyển hướng đến trang /Products
    //     } catch (error) {
    //       console.error("Lỗi khi khóa tài khoản:", error);
    //     }
    //     finally {
    //     //   getProductDetails();
    //         setSelectedUserId(null);
    //         setIsAcitiveUser(1);
    //         onSuccess(true);
    //     }
    // };
    
    // const handleUnDelete = async () => {
    //     console.log("Mở khóa");
    //     setOpen(false);
        // try {
        //     let res = await saleProduct(productsData.bookId);
        //     if(res){
        //     setOpen(false);
        //     toast.success("Sản phẩm đã được mở bán lại!");
        //     }
        //     // console.log("Sản phẩm đã được xóa");
        //     // navigate('/Products');  // Chuyển hướng đến trang /Products
        // } catch (error) {
        //     console.error("Lỗi khi mở bán sản phẩm:", error);
        // }
        // finally {
        //     getProductDetails();
        // }
    // };
    const bookType = (typeBookId) => {
        switch (typeBookId) {
          case 1:
            return "Nbook";
          case 2:
            return "Ebook";
          // case 3:
          //   return "Nbook and Ebook";
          default:
            return "Unknown";
        }
      };

    // const activeType = (type) => {
    //     switch (type) {
    //       case 1:
    //         return "Đang hoạt động";
    //       case 0:
    //         return "Đã bị khóa";
    //       // case 3:
    //       //   return "Nbook and Ebook";
    //       default:
    //         return "Unknown";
    //     }
    //   };
    
    //   const handleClickOpenEdit = (user) => {
    //     setSelectedUser(user);
    //     setOpenEdit(true);
    // };

    // const handleCloseEdit = () => {
    //     setOpenEdit(false);
    // };

    // const handleSaveEdit = (userId, formData) => {
    //     console.log(formData);
    // }
    // const handleSaveEdit = async (userId, formData) => {
    //     // try {
    //     //     const res = await updateUser(userId, formData);
    //     //     if (res) {
    //     //         toast.success("Cập nhật thông tin người dùng thành công!");
    //     //         onSuccess(true); // Refresh list
    //     //     }
    //     // } catch (error) {
    //     //     console.error("Lỗi khi cập nhật người dùng:", error);
    //     // } finally {
    //     //     handleCloseEdit();
    //     // }
    // };
    

    return (
        <div className='table-responsive mt-4'>
            <table className='table table-bordered v-align'>
                {/* table head */}
                <thead className='custom-thead'>
                    <tr>
                        <th className='bg-dark text-white'>ID</th>
                        <th className='bg-dark text-white'>Book</th>
                        <th className='bg-dark text-white'>Author</th>
                        <th className='bg-dark text-white'>Type Book</th>
                        <th className='bg-dark text-white'>Inventory</th>
                        <th className='bg-dark text-white'>Price</th>
                        <th className='bg-dark text-white'>Rating</th>
                        {/* <th className='bg-dark text-white'>Status</th> */}
                        <th className='bg-dark text-white'>Action</th>
                    </tr>
                </thead>
                {/* table body */}
                
                <tbody>
                    {productsData.map(product => (
                        <tr key={product.bookId}>
                            <td className='center-text' >#{product.bookId}</td>
                            <td className='custom-td-product'>
                                <div className='d-flex productBox'>
                                    <div className='imgWrapper'>
                                        <img src={product.image} alt='bookImg'/>
                                    </div>
                                    <div className='info ps-2 align-content-center'>
                                        <h6>{product.title}</h6>
                                    </div>
                                </div>
                            </td>
                            <td className='center-text' style={{ maxWidth: "130px" }}>{product.author_name}</td>
                            <td className='center-text' style={{ maxWidth: "150px" }}>{bookType(product.typeBookId)}</td>
                            <td className='center-text' style={{ maxWidth: "150px", color: "red" }}>{product.quantity}</td>
                            <td className='center-text' style={{ maxWidth: "100px" }}>{product.price.toLocaleString('vi-VN')} VND</td>
                            <td className='center-text' style={{ maxWidth: "100px" }}>{product.rating ?? 5} ★</td>
                            {/* <td className='center-text' style={{ maxWidth: "150px" }}>{user.address}</td> */}
                            {/* <td className='center-text' style={{ maxWidth: "150px", color: user.isActive === 1 ? 'green' : 'red' }}>{activeType(user.isActive)}</td> */}
                            {/* <td className='center-text'>{new Date(order.orderDate).toLocaleDateString('en-GB')}</td> */}
                            <td className='custom-td p-0 w-1'>
                                <div className='actions d-flex align-items-center justify-content-center'>
                                    {/* <Button className="secondary" color="secondary"><FaEye /></Button> */}
                                    <Link to={`/Products/Details/${product.bookId}`}>
                                        <Button className="secondary" color="secondary"><FaEye /></Button>
                                    </Link>
                                    {/* <Button className="success" color="success" onClick={() => handleClickOpen(user)} aria-hidden="false" ><FaPencil /></Button> */}
                                    {/* <Button className="success" color="success" aria-hidden="false" ><FaPencil /></Button> */}
                                    {/* <Button className="success" color="success" onClick={() => handleClickOpenEdit(user)} aria-hidden>
                                        <FaPencil />
                                    </Button> */}
                                    {/* <Button className="error" color="error" onClick={() => handleClickOpen(user.userId)}><IoTrashBin /></Button> */}
                                    {/* {user.isActive === 1 ? (
                                        <Button className="error" color="error" onClick={() => handleClickOpen(user.userId)}>
                                            <FaLock />
                                        </Button>
                                        ) : (
                                        // <Button className="error" color="warning" onClick={handleClickOpen}>
                                        <Button className="warning" color="warning" onClick={() => handleClickOpen(user.userId)}>
                                            <FaLockOpen />
                                        </Button>
                                    )} */}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>


            </table>
            {/* Pagination
                <div className="d-flex tableFooter">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handleChangePage}
                        className='pagination'
                        showFirstButton
                        showLastButton
                    />
                </div> */}
                {/* edit dialog  */}
                {/* <EditDialog
                    open={open}
                    handleClose={handleClose}
                    current={current}
                    setCurrent={setCurrent}
                    handleSave={handleSave}
                /> */}
                {/* <DeleteDialog
                    open={open}
                    onClose={handleClose}
                    handleDelete={isAcitiveUser ? () => handleDelete(selectedUserId) : handleUnDelete}
                    isActive={isAcitiveUser}
                />
                <EditDialog
                    open={openEdit}
                    onClose={handleCloseEdit}
                    user={selectedUser}
                    onSave={handleSaveEdit}
                />

            <ToastContainer/> */}
        </div>
    );
};

export default dashboardTable;
