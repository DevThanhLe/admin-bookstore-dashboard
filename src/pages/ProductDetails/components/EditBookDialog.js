import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { FaTimes } from 'react-icons/fa';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { toast,ToastContainer} from 'react-toastify'; // Import Toastify

const EditBookDialog = ({ open, onClose, onSave, product }) => {
  const [title, setTitle] = useState(product.title);
  const [authorName, setAuthorName] = useState(product.authorName);
  const [quantity, setQuantity] = useState(product.quantity);
  const [brandNames, setBrandNames] = useState(product.brandNames.join(', '));
  const [typeBookId, setTypeBookId] = useState(product.typeBookId);
  const [price, setPrice] = useState(product.price);
  const [rating, setRating] = useState(product.rating);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);
  const [previewImage, setPreviewImage] = useState(product.image);
  const [file, setFile] = useState(null); // State cho file doc/pdf

  useEffect(() => {
    if (open) {
      setTitle(product.title);
      setAuthorName(product.authorName);
      setQuantity(product.quantity);
      setBrandNames(product.brandNames.join(', '));
      setTypeBookId(product.typeBookId);
      setPrice(product.price);
      setRating(product.rating);
      setDescription(product.description);
      setImage(product.image);
      setPreviewImage(product.image);
      setFile(null); // Reset file doc/pdf
    }
  }, [open, product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setImage(file);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === "application/pdf" || selectedFile.type === "application/msword" || selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setFile(selectedFile);
    }
  };

  const handleSave = () => {
    // Kiểm tra nếu có trường nào bị bỏ trống
    if (!title || !authorName || !description ) {
      toast.error("Vui lòng điền đầy đủ thông tin trước khi lưu!");
      return;
    }

    // Nếu typeBookId === 2, phải có file tài liệu
    // if (typeBookId === 2 && !file) {
    //   toast.error("Vui lòng tải lên tài liệu (PDF hoặc DOC)! vì Type Book là Ebook !");
    //   return;
    // }

    // Gọi hàm onSave với các giá trị đã nhập
    onSave({
      title,
      authorName,
      quantity,
      brandNames: brandNames.split(',').map(name => name.trim()),
      typeBookId,
      price,
      rating,
      description,
      image,
      file,
    });

    toast.success("Sản phẩm đã được lưu thành công!");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="30%">
      <DialogTitle>
        Edit Product
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <FaTimes />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div className='edit-book'>

          <div className='col-sm-5 me-3'>
            {/* Cột 1: Hình ảnh và upload image/document */}
            <div style={{ width: '100%' }}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <img src={previewImage} alt="Product" style={{ width: '50%', maxHeight: 500 }} />
              </div>

              <Button variant="contained" component="label" fullWidth>
                Upload Image
                <input type="file" hidden onChange={handleImageChange} accept="image/*" />
              </Button>

              {/* Nếu typeBookId === 2, hiển thị upload document */}
              {typeBookId === 2 && (
                <>
                  <Button variant="contained" component="label" fullWidth style={{ marginTop: 10 }}>
                    Upload Document (PDF or DOC)
                    <input type="file" hidden onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                  </Button>

                  {/* Hiển thị tên file đã chọn */}
                  {file && (
                    <p className='mt-2'> File's name : {file.name}</p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Cột 2: Các trường thông tin */}
          <div className='col-sm-7'>
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Author Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />

            {/* Chỉ hiển thị trường Quantity nếu typeBookId khác 2 */}
            {typeBookId !== 2 && (
                <TextField
                    fullWidth
                    margin="normal"
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                        // Nếu input trống, đặt lại giá trị thành 0
                        const newQuantity = e.target.value === '' ? 0 : Number(e.target.value);
                        setQuantity(newQuantity);
                    }}
                />
            )}

            <TextField
              fullWidth
              margin="normal"
              label="Brand Names"
              value={brandNames}
              onChange={(e) => setBrandNames(e.target.value)}
            />

            {/* Select Type Book */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select
                value={typeBookId}
                onChange={(e) => setTypeBookId(e.target.value)}
                label="Type"
              >
                <MenuItem value={1}>Nbook</MenuItem>
                <MenuItem value={2}>Ebook</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Price (VND)"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
      <ToastContainer />
    </Dialog>
  );
};

export default EditBookDialog;
