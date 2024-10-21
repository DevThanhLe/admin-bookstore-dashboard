import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const EditDialog = ({ open, handleClose, current, setCurrent, handleSave }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Order</DialogTitle>
            <DialogContent>
                {current && (
                    <div>
                        <TextField
                            margin="dense"
                            label="User Name"
                            type="text"
                            fullWidth
                            value={current.name}
                            onChange={(e) => setCurrent({ ...current, name: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Phone"
                            type="text"
                            fullWidth
                            value={current.phone}
                            onChange={(e) => setCurrent({ ...current, phone: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Address"
                            type="text"
                            fullWidth
                            value={current.address}
                            onChange={(e) => setCurrent({ ...current, address: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Order Date"
                            type="date"
                            fullWidth
                            value={current.orderDate.split('T')[0]}
                            onChange={(e) => setCurrent({ ...current, orderDate: e.target.value })}
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={current.status}
                                onChange={(e) => setCurrent({ ...current, status: e.target.value })}
                                label="Status"
                            >
                                <MenuItem value="Completed">Completed</MenuItem>
                                <MenuItem value="Canceled">Canceled</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            margin="dense"
                            label="Total Amount"
                            type="number"
                            fullWidth
                            value={current.totalAmount}
                            onChange={(e) => setCurrent({ ...current, totalAmount: e.target.value })}
                        />
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
