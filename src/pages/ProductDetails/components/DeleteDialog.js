import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DeleteDialog = ({ open, onClose, handleDelete, isSale }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {isSale ? "Ngưng bán sản phẩm" : "Mở bán lại sản phẩm"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isSale
            ? "Bạn có chắc chắn muốn ngưng bán sản phẩm này không?"
            : "Bạn có chắc chắn muốn mở bán lại sản phẩm này không?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleDelete} color="primary">
          {isSale ? "Ngưng bán" : "Mở bán lại"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
