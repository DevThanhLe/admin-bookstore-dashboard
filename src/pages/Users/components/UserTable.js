import React from 'react';
// import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
// import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
// import { IoTrashBin } from "react-icons/io5";
// import Pagination from '@mui/material/Pagination';
// import { fetchAllUsers } from '../../../services/UserService';
// import { FaEye } from "react-icons/fa";
import DeleteDialog from './DeleteDialog';
import { unActiveUser, activeUser, updateUser } from '../../../services/UserService';
import { ToastContainer, toast } from 'react-toastify';
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import EditDialog from './EditDialog';

const UserTable = ({usersData, onSuccess}) => {
    // const token = localStorage.getItem("token");
    const [open, setOpen] = React.useState(false); // Open delete dialog
    const [selectedUserId, setSelectedUserId] = React.useState(0); // Lưu userId được chọn
    const [isAcitiveUser, setIsAcitiveUser] = React.useState(-1); // Lưu userId được chọn
    const [openEdit, setOpenEdit] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState(null)

    const handleClickOpen = (userId) => {
        const user = usersData.find(user => user.userId === userId);
        if (user) {
            setIsAcitiveUser(user.isActive); // Cập nhật isAcitiveUser dựa trên trạng thái của user
        }
    
        setSelectedUserId(userId); // Lưu userId đã chọn
        setOpen(true); // Mở dialog

      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
          let res = await unActiveUser(selectedUserId);
          if(res){
            setOpen(false);
            toast.success("Khóa tài khoản thành công!");
          }
        } catch (error) {
          console.error("Lỗi khi khóa tài khoản:", error);
        }
        finally {
            setSelectedUserId(null);
            setIsAcitiveUser(-1);
            onSuccess(true);
        }
    };
    
    const handleUnDelete = async () => {
        try {
            let res = await activeUser(selectedUserId);
            if(res){
              setOpen(false);
              toast.success("Mở khóa tài khoản thành công!");
            }
          } catch (error) {
            console.error("Lỗi khi mở khóa tài khoản:", error);
          }
          finally {
              setSelectedUserId(null);
              setIsAcitiveUser(-1);
              onSuccess(true);
          }
    };

    const activeType = (type) => {
        switch (type) {
          case 1:
            return "Đang hoạt động";
          case 0:
            return "Đã bị khóa";
          default:
            return "Unknown";
        }
      };
    
      const handleClickOpenEdit = (user) => {
        setSelectedUser(user);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleSaveEdit = async (userId, formData) => {
        try {
            let res = await updateUser(userId, formData);
            if (res) {
                toast.success("Cập nhật người dùng thành công!");
                setOpenEdit(false);
                onSuccess(true);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);
            toast.error("Cập nhật người dùng thất bại!");
        }
    }

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
                        <th className='bg-dark text-white'>Status</th>
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
                            <td className='center-text' style={{ maxWidth: "150px", color: user.isActive === 1 ? 'green' : 'red' }}>{activeType(user.isActive)}</td>
                            <td className='custom-td p-0 w-1'>
                                <div className='actions d-flex align-items-center justify-content-between'>
                                    <Button className="success" color="success" onClick={() => handleClickOpenEdit(user)} aria-hidden>
                                        <FaPencil />
                                    </Button>
                                    {user.isActive === 1 ? (
                                        <Button className="error" color="error" onClick={() => handleClickOpen(user.userId)}>
                                            <FaLock />
                                        </Button>
                                        ) : (
                                        <Button className="warning" color="warning" onClick={() => handleClickOpen(user.userId)}>
                                            <FaLockOpen />
                                        </Button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteDialog
                open={open}
                onClose={handleClose}
                handleDelete={isAcitiveUser === 1 ? handleDelete : handleUnDelete}
                isActive={isAcitiveUser}
            />
            <EditDialog
                open={openEdit}
                onClose={handleCloseEdit}
                user={selectedUser}
                onSave={handleSaveEdit}
            />
            <ToastContainer/>
        </div>
    );
};

export default UserTable;
