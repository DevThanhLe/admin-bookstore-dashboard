import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';

const EditDialog = ({ open, handleClose, current, setCurrent, handleSave, onStatusChange, dialogType }) => {
  const handleFieldChange = (field, value) => {
    setCurrent((prev) => ({ ...prev, [field]: value }));
    if (field === "status") {
      onStatusChange(value); // Cập nhật trạng thái nếu field là status
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ "& .MuiDialog-paper": { width: 400 } }}>
      <DialogTitle>{dialogType === 1 ? "Change Order's Status" : "Edit Order's Information"}</DialogTitle>
      <DialogContent>
        {current && (
          <div>
            {dialogType === 1 && (
              <FormControl fullWidth margin="dense">
                <InputLabel>Status</InputLabel>
                <Select
                  value={current.status}
                  onChange={(e) => handleFieldChange("status", e.target.value)}
                  label="Status"
                >
                  <MenuItem value="Processing">Processing</MenuItem>
                  <MenuItem value="Departed from Warehouse">Departed from Warehouse</MenuItem>
                  <MenuItem value="Shipping">Shipping</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Canceled">Canceled</MenuItem>
                </Select>
              </FormControl>
            )}
            {dialogType === 2 && (
              <>
                <TextField
                  fullWidth
                  margin="dense"
                  label="User's Full Name"
                  value={current.name || ''}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Phone"
                  value={current.phone || ''}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Address"
                  value={current.address || ''}
                  onChange={(e) => handleFieldChange("address", e.target.value)}
                />
              </>
            )}
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
