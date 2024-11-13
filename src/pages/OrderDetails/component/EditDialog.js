import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const EditDialog = ({ open, handleClose, current, setCurrent, handleSave, onStatusChange }) => {
    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setCurrent((prev) => ({ ...prev, status: newStatus }));
        onStatusChange(newStatus); // Cập nhật trạng thái ngay lập tức trong OrderTable
    };

    return (
        <Dialog open={open} onClose={handleClose} sx={{ "& .MuiDialog-paper": { width: 400 } }}>
            <DialogTitle>Change Order's Status</DialogTitle>
            <DialogContent>
                {current && (
                    <div>
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={current.status}
                                onChange={handleStatusChange}
                                label="Status"
                            >
                                <MenuItem value="Processing">Processing</MenuItem>
                                <MenuItem value="Departed from Warehouse">Departed from Warehouse</MenuItem>
                                <MenuItem value="Shipping">Shipping</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                                <MenuItem value="Canceled">Canceled</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDialog;
