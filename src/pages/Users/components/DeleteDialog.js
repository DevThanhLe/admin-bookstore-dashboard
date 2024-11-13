import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DeleteDialog = ({ open, onClose, handleDelete, isActive }) => {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          {isActive ? "Khóa tài khoản" : "Mở Khóa tài khoản"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isActive
              ? "Bạn có chắc chắn muốn Khóa tài khoản này không?"
              : "Bạn có chắc chắn muốn mở tài khoản này lại không?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button onClick={handleDelete} color="primary"> {/* Khi bấm nút này, handleDelete sẽ chạy */}
            {isActive ? "Khóa" : "Mở Khóa"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  

export default DeleteDialog;
